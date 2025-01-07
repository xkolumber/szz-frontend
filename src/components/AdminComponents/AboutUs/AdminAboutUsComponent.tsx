import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { CompressImage, uploadFileS3 } from "../../../lib/functions";
import {
  isValidDate,
  replaceS3UrlsWithCloudFront,
} from "../../../lib/functionsClient";
import { AboutUsPage } from "../../../lib/interface";
import IconUpload from "../../Icons/IconUpload";
import Tiptap from "../../TipTapEditor/TipTap";

interface Props {
  data: AboutUsPage;
  refetch: () => void;
}

const AdminAboutUsComponent = ({ data, refetch }: Props) => {
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [actualizeData, setActualizeData] = useState<AboutUsPage>(data);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActualizeData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData;
    });
  };

  const handleSaveData = async (event: any) => {
    event.preventDefault();

    if (!isValidDate(actualizeData.datum)) {
      toast.error("Dátum musí byť v tvare DD.MM.YYYY.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/aboutus/updateaboutuspage`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: data?.id,
            text1: actualizeData.text1,
            foto1: actualizeData.foto1,
            text2: actualizeData.text2,
            foto2: actualizeData.foto2,
            text3: actualizeData.text3,
            foto3: actualizeData.foto3,
            datum: actualizeData.datum,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const responseData = await response.json();

      console.log(responseData);
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Sekcia bola aktualizovaná");
        refetch();
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[], key: string) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Iba obrázky sú povolené");
      return;
    }

    setDataLoading(true);
    let formData = new FormData();

    const compressedFile = await CompressImage(file);

    if (compressedFile) {
      const newFile = new File([compressedFile], file.name, {
        type: compressedFile.type,
        lastModified: file.lastModified,
      });

      formData.append("file", newFile);

      try {
        const fileName = compressedFile.name.replace(/\s+/g, "_");
        console.log(fileName);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/upload/blogphoto`,
          { fileName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { url, fields } = response.data;

        await uploadFileS3(url, fields, formData);

        const final_url = `https://${fields.bucket}.s3.eu-north-1.amazonaws.com/${fields.key}`;

        setActualizeData((prevData) => ({
          ...prevData,
          [key]: final_url,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload the image. Please try again.");
      } finally {
        setDataLoading(false);
      }
    }
  }, []);

  const createDropHandler = (key: string) => (acceptedFiles: File[]) =>
    onDrop(acceptedFiles, key);

  const handlePhoto1Drop = createDropHandler("foto1");
  const handlePhoto2Drop = createDropHandler("foto2");
  const handlePhoto3Drop = createDropHandler("foto3");

  const {
    getRootProps: getPhoto1RootProps,
    getInputProps: getPhoto1InputProps,
  } = useDropzone({
    onDrop: handlePhoto1Drop,
  });
  const {
    getRootProps: getPhoto2RootProps,
    getInputProps: getPhoto2InputProps,
  } = useDropzone({
    onDrop: handlePhoto2Drop,
  });
  const {
    getRootProps: getPhoto3RootProps,
    getInputProps: getPhoto3InputProps,
  } = useDropzone({
    onDrop: handlePhoto3Drop,
  });

  const dragAreaClasses = classNames({
    "p-10 border-gray-400 border-2 border-dashed rounded-lg cursor-pointer":
      true,
    "bg-gray-200": false,
  });

  useEffect(() => {
    if (dataLoading || openPopUp) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [dataLoading, openPopUp]);

  const handleShowBiggerIamge = (src: string) => {
    setClickedPhoto(src);
    setOpenPopUp(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpenPopUp(false);
      }
    };

    if (openPopUp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPopUp]);

  const handleTextChange = (field: string, value: string) => {
    setActualizeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const deletePhoto = (title: string) => {
    setActualizeData((prevData) => {
      const updatedData = { ...prevData, [title]: "" };
      return updatedData;
    });
  };

  return (
    <div>
      <form className=" products_admin " onSubmit={handleSaveData}>
        <div className="product_admin_row !flex-col">
          <Tiptap
            content={actualizeData.text1}
            onChange={(value) => handleTextChange("text1", value)}
          />
        </div>

        <div className="product_admin_row">
          <p>Dátum:</p>
          <input
            type="text"
            name="datum"
            onChange={handleChange}
            className="w-[70%]"
            value={actualizeData?.datum}
            required
          />
        </div>
        <div className="product_admin_row">
          <p>foto1:</p>
          <div className="flex flex-col w-[75%]">
            {actualizeData.foto1 && (
              <div className="flex flex-row justify-between items-center">
                <img
                  width={120}
                  height={120}
                  src={replaceS3UrlsWithCloudFront(
                    actualizeData.foto1,
                    "blogphoto"
                  )}
                  className="mt-4 mb-4 cursor-pointer"
                  onClick={() =>
                    handleShowBiggerIamge(
                      replaceS3UrlsWithCloudFront(
                        actualizeData.foto1,
                        "blogphoto"
                      )
                    )
                  }
                />
                <p
                  className="!text-red-800 cursor-pointer"
                  onClick={() => deletePhoto("foto1")}
                >
                  Odstrániť
                </p>
              </div>
            )}
            <div className={dragAreaClasses} {...getPhoto1RootProps()}>
              <input
                {...getPhoto1InputProps()}
                className="border border-red-500"
              />
              <div className="flex flex-col items-center justify-center gap-4">
                <IconUpload />
                <p className="text-center">Drop files here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="product_admin_row !flex-col">
          <Tiptap
            content={actualizeData.text2}
            onChange={(value) => handleTextChange("text2", value)}
          />
        </div>
        <div className="product_admin_row">
          <p>foto2:</p>
          <div className="flex flex-col w-[75%]">
            {actualizeData.foto2 && (
              <div className="flex flex-row justify-between items-center">
                <img
                  width={120}
                  height={120}
                  src={replaceS3UrlsWithCloudFront(
                    actualizeData.foto2,
                    "blogphoto"
                  )}
                  className="mt-4 mb-4 cursor-pointer"
                  onClick={() =>
                    handleShowBiggerIamge(
                      replaceS3UrlsWithCloudFront(
                        actualizeData.foto2,
                        "blogphoto"
                      )
                    )
                  }
                />
                <p
                  className="!text-red-800 cursor-pointer"
                  onClick={() => deletePhoto("foto2")}
                >
                  Odstrániť
                </p>
              </div>
            )}
            <div className={dragAreaClasses} {...getPhoto2RootProps()}>
              <input
                {...getPhoto2InputProps()}
                className="border border-red-500"
              />
              <div className="flex flex-col items-center justify-center gap-4">
                <IconUpload />
                <p className="text-center">Drop files here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="product_admin_row !flex-col">
          <Tiptap
            content={actualizeData.text3}
            onChange={(value) => handleTextChange("text3", value)}
          />
        </div>
        <div className="product_admin_row">
          <p>foto3:</p>
          <div className="flex flex-col w-[75%]">
            {actualizeData.foto3 && (
              <div className="flex flex-row justify-between items-center">
                <img
                  width={120}
                  height={120}
                  src={replaceS3UrlsWithCloudFront(
                    actualizeData.foto3,
                    "blogphoto"
                  )}
                  className="mt-4 mb-4 cursor-pointer"
                  onClick={() =>
                    handleShowBiggerIamge(
                      replaceS3UrlsWithCloudFront(
                        actualizeData.foto3,
                        "blogphoto"
                      )
                    )
                  }
                />
                <p
                  className="!text-red-800 cursor-pointer"
                  onClick={() => deletePhoto("foto3")}
                >
                  Odstrániť
                </p>
              </div>
            )}
            <div className={dragAreaClasses} {...getPhoto3RootProps()}>
              <input
                {...getPhoto3InputProps()}
                className="border border-red-500"
              />
              <div className="flex flex-col items-center justify-center gap-4">
                <IconUpload />
                <p className="text-center">Drop files here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-8">
          <button
            className={`btn btn--tertiary ${
              (isLoading || dataLoading) && "disabledPrimaryBtn"
            }`}
            type="submit"
            disabled={isLoading || dataLoading}
          >
            {isLoading ? (
              <ClipLoader
                size={20}
                color={"#00000"}
                loading={true}
                className="ml-16 mr-16"
              />
            ) : (
              "Aktualizovať"
            )}
          </button>
        </div>
      </form>

      {dataLoading && (
        <>
          {" "}
          <div className="behind_card_background"></div>
          <div className="popup_message">
            <h5 className="text-center">Objekt sa nahráva do cloudu...</h5>
            <ClipLoader
              size={20}
              color={"#00000"}
              loading={true}
              className="ml-16 mr-16"
            />
          </div>
        </>
      )}

      {openPopUp && clickedPhoto && (
        <>
          <div className="behind_card_background"></div>
          <div className="popup_message" ref={popupRef}>
            <img
              width={420}
              height={420}
              src={clickedPhoto}
              className="max-h-[500px] object-contain"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAboutUsComponent;
