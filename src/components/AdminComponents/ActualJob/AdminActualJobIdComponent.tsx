import { classNames } from "@react-pdf-viewer/core";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import FormData from "form-data";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ActualJob } from "../../../lib/interface";
import IconUpload from "../../Icons/IconUpload";
import StepBack from "../../StepBack";

interface Props {
  data: ActualJob;
  onDataUpdated: () => void;
}

const AdminActualJobIdComponent = ({ data, onDataUpdated }: Props) => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<any>(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<ActualJob>(data);

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

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setActualizeData((prevData) => ({
      ...prevData,
      pdf: {
        ...prevData.pdf,
        [name]: value,
      },
    }));
  };

  const handleSaveProduct = async (event: any) => {
    event.preventDefault();
    if (!actualizeData.farba.startsWith("#")) {
      toast.error("Farba musí začínať s #");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/updateactualjob/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: data?.id,
            mesiac: actualizeData.mesiac,
            mesiac_cislo: actualizeData.mesiac_cislo,
            pdf: actualizeData.pdf,
            text: actualizeData.text,
            farba: actualizeData.farba,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Mesiac bol aktualizovaný");
        await queryClient.refetchQueries({ queryKey: ["admin_jobs"] });
        onDataUpdated();
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    try {
      setIsLoadingDelete(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/deleteactualjob/${
          data!.id
        }`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: data?.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Mesiac bol odstránený");
        await queryClient.refetchQueries({ queryKey: ["admin_jobs"] });
        navigate("/admin/aktualne-prace");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const onDrop = useCallback((files: any) => {
    const file = files[0];
    if (file.type !== "application/pdf") {
      toast.error("V tejto sekcii sa môžu nahrávať iba PDF súbory!");
      return;
    }
    setDataLoading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    axios
      .post(`${import.meta.env.VITE_API_URL}/admin/upload/pdf`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: () => {
          setFileUpload({ fileName: files[0].name });
        },
      })
      .then((response) => {
        const { message, uploadUrl, fileName } = response.data;

        if (message === "done") {
          setActualizeData((prevData) => ({
            ...prevData,
            pdf: { nazov: fileName, link: uploadUrl, datum: new Date() },
          }));
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
    setDataLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dragAreaClasses = classNames({
    "p-10 border-gray-400 border-2 border-dashed rounded-lg w-[300px]": true,
    "bg-gray-200": isDragActive,
  });

  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Úprava mesiaca: {data.mesiac}</h2>

          <form className=" products_admin " onSubmit={handleSaveProduct}>
            <div className="product_admin_row">
              <p>Mesiac:</p>
              <input
                type="text"
                name="mesiac"
                onChange={handleChange}
                className="w-[70%]"
                maxLength={50}
                value={actualizeData?.mesiac}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Mesiac v číselnom formáte:</p>
              <input
                type="number"
                name="mesiac_cislo"
                onChange={handleChange}
                className="w-[70%]"
                maxLength={50}
                value={actualizeData?.mesiac_cislo}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Link PDF:</p>
              <div className="flex flex-col w-[75%]">
                <input
                  type="text"
                  name="nazov"
                  onChange={handlePdfChange}
                  className="mb-2"
                  value={actualizeData?.pdf.nazov}
                  maxLength={1000}
                  required
                />
                <input
                  type="text"
                  name="link"
                  onChange={handlePdfChange}
                  className="mb-2"
                  value={actualizeData?.pdf.link}
                  maxLength={1000}
                  required
                />
                <div className={dragAreaClasses} {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    className="border border-red-500"
                  />

                  <div className="flex flex-col items-center justify-center gap-4">
                    <IconUpload />
                    <p className="text-center">Drop files here</p>
                  </div>
                </div>
                {fileUpload && (
                  <div className="mt-10">
                    <div className="">
                      <div className="flex">
                        <div className="w-full">
                          <p className="mb-4">{fileUpload.fileName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="product_admin_row">
              <p>Text:</p>
              <input
                type="text"
                name="text"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.text}
                maxLength={250}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Farba mesiaca '#ffffff' </p>
              <input
                type="text"
                name="farba"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.farba}
                maxLength={10}
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
              <button
                className="btn btn--primary !bg-red-500 "
                onClick={handleDeleteItem}
                type="button"
                disabled={isLoadingDelete}
              >
                {isLoadingDelete ? (
                  <ClipLoader
                    size={20}
                    color={"#00000"}
                    loading={true}
                    className="ml-16 mr-16"
                  />
                ) : (
                  "Odstrániť"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

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
    </div>
  );
};

export default AdminActualJobIdComponent;
