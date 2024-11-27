import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { createSlug, isValidDate } from "../../../lib/functionsClient";
import { Blog } from "../../../lib/interface";
import IconTrash from "../../Icons/IconTrash";
import IconUpload from "../../Icons/IconUpload";
import StepBack from "../../StepBack";
import { CompressImage } from "../../../lib/functions";

interface Props {
  data: Blog;
  onEventUpdated: () => void;
}

const AdminBlogPageIdComponent = ({ data, onEventUpdated }: Props) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

  const [actualizeData, setActualizeData] = useState<Blog>(data);

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

  const handleChangeItemTwoArray = (
    title: string,
    index: number,
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActualizeData((prevData) => {
      const updatedArray = [...(prevData[title as keyof Blog] as any[])];
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

    if (!isValidDate(actualizeData.datum)) {
      toast.error("Dátum musí byť v tvare DD.MM.YYYY.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/blogs/updateblog`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: data?.id,
            nazov_blog: actualizeData.nazov_blog,
            slug: createSlug(actualizeData.nazov_blog),
            datum: actualizeData.datum,
            titulna_foto: actualizeData.titulna_foto,
            popis1: actualizeData.popis1,
            foto1: actualizeData.foto1,
            popis2: actualizeData.popis2,
            foto2: actualizeData.foto2,
            popis3: actualizeData.popis3,
            foto3: actualizeData.foto3,
            pdf: actualizeData.pdf,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Blog bol aktualizovaný");
        await queryClient.refetchQueries({ queryKey: ["admin_blogs"] });
        onEventUpdated();
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    try {
      setIsLoadingDelete(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/blogs/deleteblog/${data!.id}`,
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
        toast.success("Blog bol odstránený");
        await queryClient.refetchQueries({ queryKey: ["admin_blogs"] });
        navigate("/admin/blog");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoadingDelete(false);
    }
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
  const handlePhoto1Drop = createDropHandler("foto1");
  const handlePhoto2Drop = createDropHandler("foto2");
  const handlePhoto3Drop = createDropHandler("foto3");

  const {
    getRootProps: getTitulnaRootProps,
    getInputProps: getTitulnaInputProps,
  } = useDropzone({
    onDrop: handleTitulnaPhotoDrop,
  });
  const {
    getRootProps: getPhoto1RootProps,
    getInputProps: getPhoto1InputProps,
  } = useDropzone({
    onDrop: handlePhoto1Drop,
  });
  const {
    getRootProps: getPhoto2RootProps,
    getInputProps: getPhoto2InputProps,
  } = useDropzone({
    onDrop: handlePhoto2Drop,
  });
  const {
    getRootProps: getPhoto3RootProps,
    getInputProps: getPhoto3InputProps,
  } = useDropzone({
    onDrop: handlePhoto3Drop,
  });

  const dragAreaClasses = classNames({
    "p-10 border-gray-400 border-2 border-dashed rounded-lg cursor-pointer":
      true,
    "bg-gray-200": false,
  });

  const handleAddInputPdf = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: [...prevData.pdf, { nazov: "", link: "" }],
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

  useEffect(() => {
    if (dataLoading || openPopUp) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [dataLoading, openPopUp]);

  const handleShowBiggerIamge = (src: string) => {
    setClickedPhoto(src);
    setOpenPopUp(true);
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

  const deletePhoto = (title: string) => {
    setActualizeData((prevData) => {
      const updatedData = { ...prevData, [title]: "" };
      return updatedData;
    });
  };
  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Úprava článku: {data.nazov_blog}</h2>

          <form className=" products_admin " onSubmit={handleSaveProduct}>
            <div className="product_admin_row">
              <p>Názov:</p>
              <input
                type="text"
                name="nazov_blog"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.nazov_blog}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Dátum:</p>
              <input
                type="text"
                name="datum"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.datum}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Titulná foto:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.titulna_foto && (
                  <img
                    width={120}
                    height={120}
                    src={actualizeData.titulna_foto}
                    className="mt-4 mb-4 cursor-pointer"
                    onClick={() =>
                      handleShowBiggerIamge(actualizeData.titulna_foto)
                    }
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

            <div className="product_admin_row">
              <p>Popis1:</p>
              <input
                type="text"
                name="popis1"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.popis1}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Foto1:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.foto1 && (
                  <div className="flex flex-row justify-between items-center">
                    <img
                      width={120}
                      height={120}
                      src={actualizeData.foto1}
                      className="mt-4 mb-4 cursor-pointer"
                      onClick={() => handleShowBiggerIamge(actualizeData.foto1)}
                    />
                    <p
                      className="!text-red-800 cursor-pointer"
                      onClick={() => deletePhoto("foto1")}
                    >
                      Odstrániť
                    </p>
                  </div>
                )}

                <div className={dragAreaClasses} {...getPhoto1RootProps()}>
                  <input
                    {...getPhoto1InputProps()}
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
              <p>Popis2:</p>
              <input
                type="text"
                name="popis2"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.popis2}
              />
            </div>
            <div className="product_admin_row">
              <p>Foto2:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.foto2 && (
                  <div className="flex flex-row justify-between items-center">
                    <img
                      width={120}
                      height={120}
                      src={actualizeData.foto2}
                      className="mt-4 mb-4 cursor-pointer"
                      onClick={() => handleShowBiggerIamge(actualizeData.foto2)}
                    />
                    <p
                      className="!text-red-800 cursor-pointer"
                      onClick={() => deletePhoto("foto2")}
                    >
                      Odstrániť
                    </p>
                  </div>
                )}

                <div className={dragAreaClasses} {...getPhoto2RootProps()}>
                  <input
                    {...getPhoto2InputProps()}
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
              <p>Popis 3:</p>
              <input
                type="text"
                name="popis3"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.popis3}
              />
            </div>
            <div className="product_admin_row">
              <p>Foto3:</p>
              <div className="flex flex-col w-[75%]">
                {actualizeData.foto3 && (
                  <div className="flex flex-row justify-between items-center">
                    <img
                      width={120}
                      height={120}
                      src={actualizeData.foto3}
                      className="mt-4 mb-4 cursor-pointer"
                      onClick={() => handleShowBiggerIamge(actualizeData.foto3)}
                    />
                    <p
                      className="!text-red-800 cursor-pointer"
                      onClick={() => deletePhoto("foto3")}
                    >
                      Odstrániť
                    </p>
                  </div>
                )}
                <div className={dragAreaClasses} {...getPhoto3RootProps()}>
                  <input
                    {...getPhoto3InputProps()}
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

export default AdminBlogPageIdComponent;
