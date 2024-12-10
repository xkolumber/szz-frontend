import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { GeneralPageInterface } from "../../../lib/interface";
import IconTrash from "../../Icons/IconTrash";
import Tiptap from "../../TipTapEditor/TipTap";

interface Props {
  data: GeneralPageInterface;
  refetch: () => void;
}

const AdminGdprComponent = ({ data, refetch }: Props) => {
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [openPopUp, setOpenPopUp] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [actualizeData, setActualizeData] =
    useState<GeneralPageInterface>(data);

  const handleSaveData = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/gdpr/updategdprpage`,
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
            pdf: actualizeData.pdf,
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

  useEffect(() => {
    if (dataLoading || openPopUp) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [dataLoading, openPopUp]);

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

  const handleChangeItemTwoArray = (
    title: string,
    index: number,
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActualizeData((prevData) => {
      const updatedArray = [
        ...(prevData[title as keyof GeneralPageInterface] as any[]),
      ];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: event.target.value,
      };
      return {
        ...prevData,
        [title]: updatedArray,
      };
    });
  };

  const handleUploadPdf = async (e: any, index: number) => {
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

      const { uploadUrl, fileName } = response.data;

      setActualizeData((prevData) => {
        const updatedPdf = [...prevData.pdf];
        updatedPdf[index] = {
          nazov: fileName,
          link: uploadUrl,
          datum: new Date(),
        };
        return { ...prevData, pdf: updatedPdf };
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

  const handleDeleteObjectPdf = (nazov: string, link: string) => {
    const new_pdf_data = actualizeData.pdf.filter(
      (item) => item.nazov != nazov && item.link != link
    );
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: new_pdf_data,
    }));
  };

  const handleAddInputPdf = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: [...prevData.pdf, { nazov: "", link: "", datum: new Date() }],
    }));
  };

  useEffect(() => {
    if (actualizeData.pdf.length > 0) {
      const sortedPdf = [...actualizeData.pdf].sort((a, b) => {
        const dateA = new Date(a.datum).getTime();
        const dateB = new Date(b.datum).getTime();
        return dateB - dateA;
      });

      if (JSON.stringify(actualizeData.pdf) !== JSON.stringify(sortedPdf)) {
        setActualizeData((prevState) => ({
          ...prevState,
          pdf: sortedPdf,
        }));
      }
    }
  }, [actualizeData.pdf]);

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
          <p>typ súboru: (pdf, doc, docx...)</p>
          <div className="flex flex-col">
            {actualizeData.pdf.map((object, index) => (
              <div key={index} className="flex flex-row gap-4 items-center">
                <input
                  type="text"
                  name={`pdf-nazov${index}`}
                  value={object.nazov}
                  onChange={(e) =>
                    handleChangeItemTwoArray("pdf", index, "nazov", e)
                  }
                  className="md:!w-[250px] mt-2"
                />
                <input
                  type="text"
                  name={`pdf-link-${index}`}
                  value={object.link}
                  onChange={(e) =>
                    handleChangeItemTwoArray("pdf", index, "link", e)
                  }
                  className="md:!w-[250px] mt-2"
                />
                <div
                  className=""
                  onClick={() =>
                    handleDeleteObjectPdf(object.nazov, object.link)
                  }
                >
                  <IconTrash />
                </div>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .xls, .xlsx"
                  onChange={(e) => handleUploadPdf(e, index)}
                  className="mt-2"
                />
              </div>
            ))}
            <p
              className="underline cursor-pointer mt-4"
              onClick={handleAddInputPdf}
            >
              Pridať dokument
            </p>
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
    </div>
  );
};

export default AdminGdprComponent;
