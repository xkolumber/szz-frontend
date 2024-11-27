import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Archive } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminArchivePageNew = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [authorized] = useState("ano");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<Archive>({
    id: "",
    pdf_link: "",
    pdf_nazov: "",
    rok: "",
    typ: "",
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

  const handleSaveProduct = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/archive/addarchivedoc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pdf_link: actualizeData.pdf_link,
            pdf_nazov: actualizeData.pdf_nazov,
            rok: actualizeData.rok,
            typ: actualizeData.typ,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Dokument bol úspešne vytvorený");
        navigate(`/admin/archiv/${actualizeData.rok}`);
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadPdf = async (e: any) => {
    if (actualizeData.rok === "") {
      toast.error("Najskôr zadajte rok");
      return;
    }
    setDataLoading(true);
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload only PDF files.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/upload/archivedocs/${
          actualizeData.rok
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { uploadUrl } = response.data;

      setActualizeData((prevData) => {
        return { ...prevData, pdf_link: uploadUrl };
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF. Please try again.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (dataLoading) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [dataLoading]);

  return (
    <div>
      {authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Nový dokument</h2>

          <form className=" products_admin " onSubmit={handleSaveProduct}>
            <div className="product_admin_row">
              <p>Názov:</p>
              <input
                type="text"
                name="pdf_nazov"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.pdf_nazov}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>rok:</p>
              <input
                type="text"
                name="rok"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.rok}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>pdf_link:</p>
              <input
                type="text"
                name="pdf_link"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.pdf_link}
                required
              />
              <input
                type="file"
                accept="application/pdf"
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
                  "Pridať"
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

export default AdminArchivePageNew;
