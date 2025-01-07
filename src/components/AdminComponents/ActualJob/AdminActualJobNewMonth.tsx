import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { uploadFileS3 } from "../../../lib/functions";
import { ActualJob } from "../../../lib/interface";
import IconUpload from "../../Icons/IconUpload";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminActualJobNewMonth = () => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [authorized] = useState("ano");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<ActualJob>({
    id: "",
    mesiac: "",
    mesiac_cislo: 0,
    pdf: { nazov: "", link: "", datum: new Date() },
    text: "",
    farba: "",
    link_pranostika: "",
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
            mesiac_cislo: actualizeData.mesiac_cislo,
            pdf: actualizeData.pdf,
            text: actualizeData.text,
            farba: actualizeData.farba,
            link_pranostika: actualizeData.link_pranostika,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Mesiac bol pridaný");
        await queryClient.refetchQueries({ queryKey: ["admin_jobs"] });
        navigate("/admin/aktualne-prace");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(async (files: any) => {
    const file = files[0];
    if (file.type !== "application/pdf") {
      toast.error("V tejto sekcii sa môžu nahrávať iba PDF súbory!");
      return;
    }
    setDataLoading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    const fileName = file.name;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/upload/pdf`,
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
      pdf: { nazov: fileName, link: final_url, datum: new Date() },
    }));
    setDataLoading(false);
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
              </div>
            </div>
            <div className="product_admin_row">
              <p>Link na pranostiku: </p>
              <input
                type="text"
                name="link_pranostika"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.link_pranostika}
                required
              />
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

export default AdminActualJobNewMonth;
