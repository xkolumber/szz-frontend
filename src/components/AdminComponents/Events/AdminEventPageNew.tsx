import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { CompressImage, uploadFileS3 } from "../../../lib/functions";
import {
  createSlug,
  isValidMonth,
  replaceS3UrlsWithCloudFront,
} from "../../../lib/functionsClient";
import { ActualEvent } from "../../../lib/interface";
import IconTrash from "../../Icons/IconTrash";
import IconUpload from "../../Icons/IconUpload";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminEventPageNew = () => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [authorized] = useState("ano");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<ActualEvent>({
    id: "",
    link_podujatie: "",
    nazov_vystavy: "",
    datum_den: "",
    datum_mesiac: "",
    datum_rok: "",
    datum_koniec: "",
    miesto_podujatia: "",
    cas: "",
    hostia: "",
    titulna_foto: "",
    text1: "",
    slug: "",
    typ: "vsetky",
    pdf: [],
    fotky: [],
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActualizeData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData;
    });
  };

  const handleChangeItemArray = (
    title: string,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActualizeData((prevData) => {
      const updatedArray = [
        ...(prevData[title as keyof ActualEvent] as string[]),
      ];
      updatedArray[index] = event.target.value;
      return {
        ...prevData,
        [title]: updatedArray,
      };
    });
  };

  const handleChangeItemTwoArray = (
    title: string,
    index: number,
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActualizeData((prevData) => {
      const updatedArray = [...(prevData[title as keyof ActualEvent] as any[])];
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

  const handleSaveProduct = async (event: any) => {
    event.preventDefault();
    if (actualizeData.typ != "vsetky" && actualizeData.typ != "zvaz") {
      toast.error("Udalosť musí mať tvar vsetky alebo zvaz!");
      return;
    }
    if (!isValidMonth(actualizeData.datum_mesiac)) {
      toast.error("Mesiac musí byť číslo od 1 po 12");
      return;
    }

    if (actualizeData.titulna_foto === "") {
      toast.error("Chýba titulná foto.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/events/addevent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            link_podujatie: actualizeData.link_podujatie,
            nazov_vystavy: actualizeData.nazov_vystavy,
            datum_den: actualizeData.datum_den,
            datum_mesiac: actualizeData.datum_mesiac,
            datum_rok: actualizeData.datum_rok,
            datum_koniec: actualizeData.datum_koniec,
            miesto_podujatia: actualizeData.miesto_podujatia,
            cas: actualizeData.cas,
            hostia: actualizeData.hostia,
            titulna_foto: actualizeData.titulna_foto,
            text1: actualizeData.text1,
            slug: createSlug(actualizeData.nazov_vystavy),
            typ: actualizeData.typ,
            pdf: actualizeData.pdf,
            fotky: actualizeData.fotky,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Udalosť bola vytvorená");
        await queryClient.refetchQueries({
          queryKey: ["admin_events", actualizeData.datum_rok],
        });
        navigate(`/admin/vystavy-a-podujatia/${actualizeData.datum_rok}`);
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddInputPdf = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: [...prevData.pdf, { nazov: "", link: "", datum: new Date() }],
    }));
  };

  useEffect(() => {
    if (dataLoading) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [dataLoading]);

  const handleDeleteObjectPdf = (nazov: string, link: string) => {
    const new_pdf_data = actualizeData.pdf.filter(
      (item) => item.nazov != nazov && item.link != link
    );
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: new_pdf_data,
    }));
  };

  const handleUploadPdf = async (e: any, index: number) => {
    setDataLoading(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
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

      setActualizeData((prevData) => {
        const updatedPdf = [...prevData.pdf];
        updatedPdf[index] = {
          nazov: file.name,
          link: final_url,
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

  const handleDeletePhoto = (src: string) => {
    const new_pdf_data = actualizeData.fotky.filter((item) => item != src);
    setActualizeData((prevData) => ({
      ...prevData,
      fotky: new_pdf_data,
    }));
  };

  const handleUploadPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      toast.error("Iba obrázky sú povolené");
      return;
    }

    setDataLoading(true);

    const compressedFiles = [];
    for (const file of files) {
      const compressedFile = await CompressImage(file);
      if (compressedFile) {
        const newFile = new File([compressedFile], file.name, {
          type: compressedFile.type,
          lastModified: file.lastModified,
        });
        compressedFiles.push(newFile);
      }
    }

    try {
      const uploadedUrls = await Promise.all(
        compressedFiles.map(async (compressedFile) => {
          const formData = new FormData();

          const fileName = compressedFile.name.replace(/\s+/g, "_");
          console.log(fileName);

          formData.append("file", compressedFile);

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/admin/upload/photoUnion`,
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
          return final_url;
        })
      );

      setActualizeData((prevData) => {
        const updatedPhotos = [...prevData.fotky, ...uploadedUrls];
        return { ...prevData, fotky: updatedPhotos };
      });
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("Failed to upload one or more photos. Please try again.");
    } finally {
      setDataLoading(false);
    }
    e.target.value = "";
  };

  const onDrop = useCallback(async (acceptedFiles: File[], key: string) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Iba obrázky sú povolené");
      return;
    }
    setDataLoading(true);

    const compressedFile = await CompressImage(file);

    const formData = new FormData();
    formData.append("file", compressedFile!);

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

  const handleTitulnaPhotoDrop = createDropHandler("titulna_foto");

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

  return (
    <div>
      {authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Nová udalosť: </h2>

          <form className=" products_admin " onSubmit={handleSaveProduct}>
            <div className="product_admin_row">
              <p>Názov výstavy:</p>
              <input
                type="text"
                name="nazov_vystavy"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.nazov_vystavy}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Dátum deň:</p>
              <input
                type="text"
                name="datum_den"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.datum_den}
                required
                placeholder="2"
              />
            </div>
            <div className="product_admin_row">
              <p>Dátum mesiac:</p>
              <input
                type="text"
                name="datum_mesiac"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.datum_mesiac}
                required
                placeholder="8"
              />
            </div>
            <div className="product_admin_row">
              <p>Dátum rok:</p>
              <input
                type="text"
                name="datum_rok"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.datum_rok}
                required
                placeholder="2024"
              />
            </div>
            <div className="product_admin_row">
              <p>Dátum koniec udalosti (nepovinné):</p>
              <input
                type="text"
                name="datum_koniec"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.datum_koniec}
                placeholder="12.2.2024"
              />
            </div>
            <div className="product_admin_row">
              <p>Miesto podujatia:</p>
              <input
                type="text"
                name="miesto_podujatia"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.miesto_podujatia}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Link podujatia:</p>
              <input
                type="text"
                name="link_podujatie"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.link_podujatie}
                placeholder="https://www.google.sk"
              />
            </div>
            <div className="product_admin_row">
              <p>Hostia:</p>
              <input
                type="text"
                name="hostia"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.hostia}
              />
            </div>
            <div className="product_admin_row">
              <p>Čas:</p>
              <input
                type="text"
                name="cas"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.cas}
              />
            </div>
            <div className="product_admin_row">
              <p>Titulná foto:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.titulna_foto && (
                  <div className="flex flex-row justify-between items-center">
                    <img
                      width={120}
                      height={120}
                      src={replaceS3UrlsWithCloudFront(
                        actualizeData.titulna_foto,
                        "blogphoto"
                      )}
                      className="mt-4 mb-4 cursor-pointer"
                    />
                  </div>
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
            <div className="product_admin_row">
              <p>Text 1:</p>
              <textarea
                name="text1"
                onChange={handleChange}
                className="w-[70%] !h-[24rem]"
                value={actualizeData?.text1}
              />
            </div>
            <div className="product_admin_row">
              <p>Typ: vsetky | zvaz </p>
              <input
                type="text"
                name="typ"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.typ}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Dokument:</p>
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

            <div className="product_admin_row">
              <p>Prislúchajúce fotky:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.fotky.map((object, index) => (
                  <div
                    className="flex flex-row gap-4 items-center justify-end"
                    key={index}
                  >
                    <img
                      src={replaceS3UrlsWithCloudFront(object, "photoUnion")}
                      alt=""
                      className="w-48 h-48 object-cover"
                    />
                    <input
                      key={index}
                      type="text"
                      name={`fotky${index}`}
                      value={object}
                      onChange={(e) => handleChangeItemArray("fotky", index, e)}
                      className="w-[450px] mt-2"
                    />
                    <div className="" onClick={() => handleDeletePhoto(object)}>
                      <IconTrash />
                    </div>
                  </div>
                ))}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadPhotos(e)}
                  className="mt-6"
                  multiple
                />
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
    </div>
  );
};

export default AdminEventPageNew;
