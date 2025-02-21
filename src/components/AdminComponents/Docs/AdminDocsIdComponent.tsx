import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Tlacivo } from "../../../lib/interface";
import StepBack from "../../StepBack";
import { uploadFileS3 } from "../../../lib/functions";

interface Props {
  data: Tlacivo;
  onDataUpdated: () => void;
}

const AdminDocsIdComponent = ({ data, onDataUpdated }: Props) => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<Tlacivo>(data);

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

  const handleSaveProduct = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/docs/updatedoc`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            id: data?.id,
            link: actualizeData.link,
            nazov: actualizeData.nazov,
            typ: actualizeData.typ,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Tlačivo bolo aktualizované");
        await queryClient.refetchQueries({ queryKey: ["admin_docs"] });
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
        `${import.meta.env.VITE_API_URL}/admin/docs/deletedoc/${data!.id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",

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
        toast.success("Tlačivo bolo odstránené");
        await queryClient.refetchQueries({ queryKey: ["admin_docs"] });
        navigate("/admin/tlaciva");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleUploadPdf = async (e: any) => {
    setDataLoading(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const jsonData = {
        fileName: file.name,
        year: "tlaciva",
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/upload/archivedocs`,
        jsonData,
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

      setActualizeData((prevData) => {
        return { ...prevData, pdf_link: final_url };
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert(
        "Súbor má nepovolenú príponu. Povolené sú pdf, doc, docx, xls, xlsx"
      );
    } finally {
      setDataLoading(false);
      e.target.value = null;
    }
  };

  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Úprava tlačiva: {data.nazov}</h2>

          <form className=" products_admin " onSubmit={handleSaveProduct}>
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
              <p>link:</p>
              <input
                type="text"
                name="link"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.link}
                required
              />
              <input
                type="file"
                accept=".pdf, .doc, .docx, .xls, .xlsx"
                onChange={(e) => handleUploadPdf(e)}
                className="mt-2"
              />
            </div>
            <div className="product_admin_row">
              <p>typ súboru: (pdf, doc, docx...)</p>
              <input
                type="text"
                name="typ"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.typ}
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

export default AdminDocsIdComponent;
