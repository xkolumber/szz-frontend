import toast, { Toaster } from "react-hot-toast";
import StepBack from "../StepBack";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Cookies from "js-cookie";
import copy from "copy-to-clipboard";
import IconCopy from "../Icons/IconCopy";

const AdminNewFile = () => {
  const [pdfLink, setPdfLink] = useState<string | undefined>("");
  const token = localStorage.getItem("token");
  const [dataLoading, setDataLoading] = useState(false);

  const handleUploadPdf = async (e: any) => {
    setDataLoading(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/upload/archivedocs/tlaciva`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { uploadUrl } = response.data;

      Cookies.set("link", uploadUrl, {
        secure: true,
        sameSite: "None",
        path: "/",
      });

      setPdfLink(uploadUrl);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert(
        "Súbor má nepovolenú príponu. Povolené sú pdf, doc, docx, xls, xlsx"
      );
    } finally {
      setDataLoading(false);
    }
  };

  const handleCopy = () => {
    toast.success("Link je skopírovaný");
    if (pdfLink) {
      copy(pdfLink);
    }
  };

  const handleDelete = () => {
    Cookies.remove("link");
    setPdfLink("");

    toast.success("Link je odstránený");
  };

  useEffect(() => {
    if (Cookies.get("link")) {
      setPdfLink(Cookies.get("link"));
    }
  }, [Cookies]);

  return (
    <div className=" min-h-screen">
      <div className="main_section !pt-0 products_admin">
        <StepBack />
        <Toaster />
        <h2>Pridať nový súbor</h2>
        <p>povolené prípony: .pdf, .doc, .docx, .xls, .xlsx</p>
        <div className="product_admin_row">
          <p>link:</p>
          <input type="text" className="w-[70%]" value={pdfLink} required />
          <input
            type="file"
            accept=".pdf, .doc, .docx, .xls, .xlsx"
            onChange={(e) => handleUploadPdf(e)}
            className="mt-2"
          />
        </div>
        <div className="flex flex-row justify-between pt-4">
          <button
            className={`btn btn--tertiary ${pdfLink === "" && "disabledbtn"}`}
            onClick={() => handleCopy()}
            disabled={pdfLink === ""}
          >
            Kopírovať
            <IconCopy />
          </button>
          <button
            className={`btn btn--tertiary !bg-red-500 ${
              pdfLink === "" && "disabledbtn"
            }`}
            onClick={() => handleDelete()}
            disabled={pdfLink === ""}
          >
            Vymazať link
          </button>
        </div>
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
    </div>
  );
};

export default AdminNewFile;
