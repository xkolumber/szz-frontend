import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { CompressImage } from "../../../lib/functions";
import { Spravodajca } from "../../../lib/interface";
import IconTrash from "../../Icons/IconTrash";
import IconUpload from "../../Icons/IconUpload";
import StepBack from "../../StepBack";
import Tiptap from "../../TipTapEditor/TipTap";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminSpravodajciNew = () => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [authorized] = useState("ano");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<Spravodajca>({
    id: "",
    foto: "",
    text1: "",
    pdf: [],
    rok: 0,
    mesiac: 0,
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

  const handleAddObject = async (event: any) => {
    event.preventDefault();

    if (actualizeData.foto === "") {
      toast.error("Obrázok je povinný!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/spravodajca/adddspravodajca`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            foto: actualizeData.foto,
            text1: actualizeData.text1,
            pdf: actualizeData.pdf,
            rok: actualizeData.rok,
            mesiac: actualizeData.mesiac,
            nazov: actualizeData.nazov,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Objekt bolo pridaný");
        await queryClient.refetchQueries({ queryKey: ["admin_spravodajci"] });
        navigate("/admin/spravodajci");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoading(false);
    }
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
    }
  };

  const handleChangeItemTwoArray = (
    title: string,
    index: number,
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActualizeData((prevData) => {
      const updatedArray = [...(prevData[title as keyof Spravodajca] as any[])];
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

  const handleTextChange = (field: string, value: string) => {
    setActualizeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShowBiggerIamge = (src: string) => {
    setClickedPhoto(src);
    setOpenPopUp(true);
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
    }
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

  const handleTitulnaPhotoDrop = createDropHandler("foto");

  const {
    getRootProps: getTitulnaRootProps,
    getInputProps: getTitulnaInputProps,
  } = useDropzone({
    onDrop: handleTitulnaPhotoDrop,
  });

  const dragAreaClasses = classNames({
    "p-10 border-gray-400 border-2 border-dashed rounded-lg cursor-pointer":
      true,
    "bg-gray-200": false,
  });

  const handleAddInputPdf = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: [...prevData.pdf, { nazov: "", link: "", datum: new Date() }],
    }));
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
      {authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Nové tlačivo</h2>

          <form className=" products_admin " onSubmit={handleAddObject}>
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
              <p>Rok:</p>
              <input
                type="number"
                name="rok"
                onChange={handleChange}
                className="w-[70%]"
                maxLength={50}
                value={actualizeData?.rok}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Mesiac:</p>
              <input
                type="number"
                name="mesiac"
                onChange={handleChange}
                className="w-[70%]"
                maxLength={50}
                value={actualizeData?.mesiac}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Titulná foto:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.foto && (
                  <img
                    width={120}
                    height={120}
                    src={actualizeData.foto}
                    className="mt-4 mb-4 cursor-pointer"
                    onClick={() => handleShowBiggerIamge(actualizeData.foto)}
                  />
                )}
                <div className={dragAreaClasses} {...getTitulnaRootProps()}>
                  <input
                    {...getTitulnaInputProps()}
                    className="border border-red-500"
                  />
                  <div className="flex flex-col items-center justify-center gap-4">
                    <IconUpload />
                    <p className="text-center">Drop files here</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_admin_row !flex-col">
              <Tiptap
                content={actualizeData.text1}
                onChange={(value) => handleTextChange("text1", value)}
              />
            </div>

            <div className="product_admin_row">
              <p>typ súboru: (pdf, doc, docx...)</p>
              <div className="flex flex-col">
                <p
                  className="underline cursor-pointer mt-4 mb-16"
                  onClick={handleAddInputPdf}
                >
                  Pridať súbor
                </p>
                {actualizeData.pdf
                  .sort(
                    (a, b) =>
                      new Date(b.datum).getTime() - new Date(a.datum).getTime()
                  )
                  .map((object, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-4 items-center"
                    >
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
              </div>
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

export default AdminSpravodajciNew;
