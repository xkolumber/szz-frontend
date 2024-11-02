import React, { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ActualJob } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";
import axios from "axios";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import IconDownload from "../../Icons/IconDownload";

const AdminActualJobNewMonth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<any>(null);

  const [authorized] = useState("ano");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<ActualJob>({
    id: "",
    mesiac: "",
    pdf: { nazov: "", link: "" },
    text: "",
    farba: "",
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

  const handleAddMonth = async (event: any) => {
    event.preventDefault();
    if (!actualizeData.farba.startsWith("#")) {
      toast.error("Farba musí začínať s #");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/addactualjob`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mesiac: actualizeData.mesiac,
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
        toast.success("Mesiac bol pridaný");
        navigate("/admin/aktualne-prace");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((files: any) => {
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
            pdf: { nazov: fileName, link: uploadUrl },
          }));
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dragAreaClasses = classNames({
    "p-10 border-gray-400 border-2 border-dashed rounded-lg": true,
    "bg-gray-200": isDragActive,
  });

  return (
    <div>
      {authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Nový mesiac</h2>

          <form className=" products_admin " onSubmit={handleAddMonth}>
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
              <p>Link PDF:</p>
              <div className="flex flex-col w-[70%]">
                <input
                  type="text"
                  name="nazov"
                  onChange={handlePdfChange}
                  className="w-[70%] mb-2"
                  value={actualizeData?.pdf.nazov}
                  maxLength={1000}
                  required
                />
                <input
                  type="text"
                  name="link"
                  onChange={handlePdfChange}
                  className="w-[70%] "
                  value={actualizeData?.pdf.link}
                  maxLength={1000}
                  required
                />
                <div className={dragAreaClasses} {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    className="border border-red-500"
                  />
                  {isDragActive ? (
                    <div className="flex flex-col">
                      <IconDownload />
                      <div className="text-center">Drop the file</div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <IconDownload />
                      <p className="text-center">Drop files here</p>
                    </div>
                  )}
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
              <p>Farba mesiacu: '#ffffff' </p>
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
            </div>
          </form>
        </div>
      )}

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminActualJobNewMonth;
