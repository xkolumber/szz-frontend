import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { isValidDate } from "../../../lib/functionsClient";
import { AboutUsPage } from "../../../lib/interface";
import IconUpload from "../../Icons/IconUpload";

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

  const onDrop = useCallback((acceptedFiles: File[], key: string) => {
    setDataLoading(true);
    const file = acceptedFiles[0];
    if (!file || !["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Please upload only image files (JPEG or PNG).");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/admin/upload/blogphoto`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const { message, uploadUrl } = response.data;

        if (message === "done") {
          setActualizeData((prevData) => ({
            ...prevData,
            [key]: uploadUrl,
          }));
        }
        setDataLoading(false);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
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

  return (
    <div>
      <form className=" products_admin " onSubmit={handleSaveData}>
        <div className="product_admin_row">
          <p>Text1:</p>
          <input
            type="text"
            name="text1"
            onChange={handleChange}
            className="w-[70%]"
            value={actualizeData?.text1}
            required
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
              <img
                width={120}
                height={120}
                src={actualizeData.foto1}
                className="mt-4 mb-4 cursor-pointer"
                onClick={() => handleShowBiggerIamge(actualizeData.foto1)}
              />
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

        <div className="product_admin_row">
          <p>text2:</p>
          <input
            type="text"
            name="text2"
            onChange={handleChange}
            className="w-[70%]"
            value={actualizeData?.text2}
            required
          />
        </div>
        <div className="product_admin_row">
          <p>foto2:</p>
          <div className="flex flex-col w-[75%]">
            {actualizeData.foto2 && (
              <img
                width={120}
                height={120}
                src={actualizeData.foto2}
                className="mt-4 mb-4 cursor-pointer"
                onClick={() => handleShowBiggerIamge(actualizeData.foto2)}
              />
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

        <div className="product_admin_row">
          <p>text3:</p>
          <input
            type="text"
            name="text3"
            onChange={handleChange}
            className="w-[70%]"
            value={actualizeData?.text3}
          />
        </div>
        <div className="product_admin_row">
          <p>foto3:</p>
          <div className="flex flex-col w-[75%]">
            {actualizeData.foto2 && (
              <img
                width={120}
                height={120}
                src={actualizeData.foto3}
                className="mt-4 mb-4 cursor-pointer"
                onClick={() => handleShowBiggerIamge(actualizeData.foto3)}
              />
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
