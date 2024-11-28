import axios from "axios";
import React, { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { isValidMonth, isValidTime } from "../../../lib/functionsClient";
import { ActualEvent } from "../../../lib/interface";
import IconTrash from "../../Icons/IconTrash";
import StepBack from "../../StepBack";
import { useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import IconUpload from "../../Icons/IconUpload";
import { CompressImage } from "../../../lib/functions";

interface Props {
  data: ActualEvent;
  onDataUpdated: () => void;
}

const AdminEventPageIdComponent = ({ data, onDataUpdated }: Props) => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<ActualEvent>(data);

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

  const handleSaveProduct = async (event: any) => {
    event.preventDefault();

    if (actualizeData.typ != "sk" && actualizeData.typ != "zah") {
      toast.error("Udalosť musí mať tvar sk alebo zah!");
      return;
    }

    if (!isValidTime(actualizeData.cas)) {
      toast.error("Čas musí byť v tvare HH:MM.");
      return;
    }

    if (!isValidMonth(actualizeData.datum_mesiac)) {
      toast.error("Mesiac musí byť číslo od 1 po 12");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/events/updateevent`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: data?.id,
            nazov_vystavy: actualizeData.nazov_vystavy,
            datum_den: actualizeData.datum_den,
            datum_mesiac: actualizeData.datum_mesiac,
            datum_rok: actualizeData.datum_rok,
            miesto_podujatia: actualizeData.miesto_podujatia,
            cas: actualizeData.cas,
            hostia: actualizeData.hostia,
            titulna_foto: actualizeData.titulna_foto,
            text1: actualizeData.text1,
            text2: actualizeData.text2,
            slug: actualizeData.slug,
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
        toast.success("Oznam bol aktualizovaný");
        await queryClient.refetchQueries({ queryKey: ["admin_events"] });
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
        `${import.meta.env.VITE_API_URL}/admin/events/deleteevent/${data!.id}`,
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
        await queryClient.refetchQueries({ queryKey: ["admin_events"] });
        toast.success("Udalosť bola odstránená");
        navigate("/admin/vystavy-a-podujatia");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoadingDelete(false);
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

  const handleUploadPdf = async (e: any, index: number) => {
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
        `${import.meta.env.VITE_API_URL}/admin/upload/pdf`,
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
        updatedPdf[index] = { nazov: fileName, link: uploadUrl };
        return { ...prevData, pdf: updatedPdf };
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF. Please try again.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleAddInputPdf = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: [...prevData.pdf, { nazov: "", link: "" }],
    }));
  };

  const handleDeletePhoto = (src: string) => {
    const new_pdf_data = actualizeData.fotky.filter((item) => item != src);
    setActualizeData((prevData) => ({
      ...prevData,
      fotky: new_pdf_data,
    }));
  };

  const handleUploadPhoto = async (e: any, index: number) => {
    setDataLoading(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/upload/photoUnion`,
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
        const updatedPhoto = [...prevData.fotky];
        updatedPhoto[index] = uploadUrl;
        return { ...prevData, fotky: updatedPhoto };
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF. Please try again.");
    } finally {
      setDataLoading(false);
    }
  };
  const handleAddInputPhoto = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      fotky: [...prevData.fotky, ""],
    }));
  };

  const onDrop = useCallback(async (acceptedFiles: File[], key: string) => {
    const file = acceptedFiles[0];
    if (!file || !["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Please upload only image files (JPEG or PNG).");
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
      {data && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Úprava udalosti: {data.nazov_vystavy}</h2>

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
              <p>Titulná foto:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.titulna_foto && (
                  <div className="flex flex-row justify-between items-center">
                    <img
                      width={120}
                      height={120}
                      src={actualizeData.titulna_foto}
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
              <p>Text 2:</p>
              <textarea
                name="text2"
                onChange={handleChange}
                className="w-[70%] !h-[24rem]"
                value={actualizeData?.text2}
              />
            </div>
            <div className="product_admin_row">
              <p>Typ: sk | zah </p>
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
              <p>Pdf:</p>
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
                      accept="application/pdf"
                      onChange={(e) => handleUploadPdf(e, index)}
                      className="mt-2"
                    />
                  </div>
                ))}
                <p
                  className="underline cursor-pointer mt-4"
                  onClick={handleAddInputPdf}
                >
                  Pridať pdf
                </p>
              </div>
            </div>

            <div className="product_admin_row">
              <p>Prislúchajúce fotky:</p>
              <div className="flex flex-col">
                {actualizeData.fotky.map((object, index) => (
                  <div className="flex flex-row gap-4 items-center" key={index}>
                    <input
                      key={index}
                      type="text"
                      name={`fotky${index}`}
                      value={object}
                      onChange={(e) => handleChangeItemArray("fotky", index, e)}
                      className="md:!w-[450px] mt-2"
                    />
                    <div className="" onClick={() => handleDeletePhoto(object)}>
                      <IconTrash />
                    </div>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => handleUploadPhoto(e, index)}
                      className="mt-2"
                    />
                  </div>
                ))}
                <p
                  className="underline cursor-pointer mt-4"
                  onClick={handleAddInputPhoto}
                >
                  Pridať foto
                </p>
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

export default AdminEventPageIdComponent;
