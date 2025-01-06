import toast, { Toaster } from "react-hot-toast";
import StepBack from "../StepBack";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Cookies from "js-cookie";
import copy from "copy-to-clipboard";
import IconCopy from "../Icons/IconCopy";
import { CompressImage } from "../../lib/functions";

const AdminNewFile = () => {
  const [pdfLink, setPdfLink] = useState<string | undefined>("");
  const token = localStorage.getItem("token");
  const [dataLoading, setDataLoading] = useState(false);

  const handleUploadFile = async (e: any) => {
    setDataLoading(true);

    const file = e.target.files?.[0];
    if (!file) {
      alert("No file selected.");
      setDataLoading(false);
      return;
    }

    try {
      let formData = new FormData();

      if (file.type.startsWith("image/")) {
        const compressedFile = await CompressImage(file);

        if (compressedFile) {
          const newFile = new File([compressedFile], file.name, {
            type: compressedFile.type,
            lastModified: file.lastModified,
          });

          formData.append("file", newFile);
        } else {
          alert("Image compression failed.");
          e.target.value = null;
          setDataLoading(false);
          return;
        }
      } else {
        formData.append("file", file);
      }

      const fileName = file.name.replace(/\s+/g, "_");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/upload/randomfiles`,
        { fileName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { url, fields } = response.data;

      console.log("Received URL:", url);
      console.log("Received Fields:", fields);

      const formDataS3 = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formDataS3.append(key, value as string);
      });

      const final_file = formData.get("file");
      if (final_file instanceof File) {
        formDataS3.append("file", final_file);
      } else {
        console.error("No file found in formData.");
      }

      try {
        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formDataS3,
        });
        console.log(uploadResponse);
      } catch (error) {
        console.log(error);
      }

      setPdfLink(
        `${import.meta.env.VITE_CLOUDFRONT_URL_RANDOM_FILES}/${fields.key}`
      );
      Cookies.set(
        "link",
        `${import.meta.env.VITE_CLOUDFRONT_URL_RANDOM_FILES}/${fields.key}`,
        {
          secure: true,
          sameSite: "None",
          path: "/",
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Niekde nastala chyba.");
    } finally {
      setDataLoading(false);
      e.target.value = null;
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

  // useEffect(() => {
  //   const checkAdmin = async (token: string) => {
  //     const result = await verifyAdmin(token);
  //     console.log(result);
  //   };
  //   if (token) {
  //     checkAdmin(token);
  //   }
  // }, [token]);

  return (
    <div className=" min-h-screen">
      {token && (
        <div className="main_section !pt-0 products_admin">
          <StepBack />
          <Toaster />
          <h2>Pridať nový súbor</h2>
          <p>
            povolené prípony: .pdf, .doc, .docx, .xls, .xlsx, všetky typy
            obrázkov okrem svg
          </p>
          <div className="product_admin_row">
            <p>link:</p>
            <input
              type="text"
              className="w-[70%]"
              defaultValue={pdfLink}
              required
            />
            <input
              type="file"
              accept=".pdf, .doc, .docx, .xls, .xlsx, image/*"
              onChange={(e) => handleUploadFile(e)}
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

export default AdminNewFile;
