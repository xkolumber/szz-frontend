import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Sponsor } from "../../../lib/interface";
import IconUpload from "../../Icons/IconUpload";
import StepBack from "../../StepBack";

import { CompressImage, uploadFileS3 } from "../../../lib/functions";
import { replaceS3UrlsWithCloudFront } from "../../../lib/functionsClient";

const AdminSponsorNew = () => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);

  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

  const [actualizeData, setActualizeData] = useState<Sponsor>({
    id: "",
    link: "",
    logo: "",
    nazov: "",
  });

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

  const handleAddSponsor = async (event: any) => {
    event.preventDefault();

    if (actualizeData.logo === "") {
      toast.error("Zabudli ste nahrať obrázok!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/sponsors/addsponsor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            link: actualizeData.link,
            logo: actualizeData.logo,
            nazov: actualizeData.nazov,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Sponzor bol pridaný");
        await queryClient.refetchQueries({ queryKey: ["admin_sponsors"] });
        navigate("/admin/sponzori");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
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
          `${import.meta.env.VITE_API_URL}/admin/upload/imagesalll`,
          { fileName },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
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

  const handlePhoto1Drop = createDropHandler("logo");

  const {
    getRootProps: getPhoto1RootProps,
    getInputProps: getPhoto1InputProps,
  } = useDropzone({
    onDrop: handlePhoto1Drop,
  });

  const dragAreaClasses = classNames({
    "p-10 border-gray-400 border-2 border-dashed rounded-lg cursor-pointer":
      true,
    "bg-gray-200": false,
  });

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
      <div className=" w-full">
        <StepBack />
        <Toaster />
        <h2>Nový sponzor</h2>

        <form className=" products_admin " onSubmit={handleAddSponsor}>
          <div className="product_admin_row">
            <p>Názov:</p>
            <input
              type="text"
              name="nazov"
              onChange={handleChange}
              className="w-[70%]"
              maxLength={50}
              value={actualizeData?.nazov}
              required
            />
          </div>
          <div className="product_admin_row">
            <p>Logo:</p>
            <div className="flex flex-col w-[75%]">
              {actualizeData.logo && (
                <img
                  width={120}
                  height={120}
                  src={replaceS3UrlsWithCloudFront(
                    actualizeData.logo,
                    "imagesalll"
                  )}
                  className="mt-4 mb-4 cursor-pointer"
                  onClick={() =>
                    handleShowBiggerIamge(
                      replaceS3UrlsWithCloudFront(
                        actualizeData.logo,
                        "imagesalll"
                      )
                    )
                  }
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
            <p>Link:</p>
            <input
              type="text"
              name="link"
              onChange={handleChange}
              className="w-[70%]"
              maxLength={50}
              value={actualizeData?.link}
              required
            />
          </div>

          <div className="flex flex-row justify-between mt-8">
            <button
              className={`btn btn--tertiary ${
                isLoading && "disabledPrimaryBtn"
              }`}
              type="submit"
              disabled={isLoading}
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
      </div>

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

export default AdminSponsorNew;
