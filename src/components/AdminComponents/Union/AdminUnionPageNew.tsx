import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import {
  createSlug,
  replaceS3UrlsWithCloudFront,
} from "../../../lib/functionsClient";
import { SelectOption, UnionData } from "../../../lib/interface";
import IconTrash from "../../Icons/IconTrash";
import StepBack from "../../StepBack";

import Tiptap from "../../TipTapEditor/TipTap";
import { CompressImage, uploadFileS3 } from "../../../lib/functions";

const AdminUnionPageNew = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedOptions, setSelectOptions] = useState<SelectOption[]>([]);

  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<UnionData>({
    id: "",
    nazov: "",
    slug: "",
    rodic: "",
    text: "",
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
        ...(prevData[title as keyof UnionData] as string[]),
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
      const updatedArray = [...(prevData[title as keyof UnionData] as any[])];
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

  const handleAddNewObject = async (event: any) => {
    event.preventDefault();

    if (actualizeData.rodic === "") {
      toast.error("Vyberte hodnotu pre RODIČ");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/addunion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            nazov: actualizeData.nazov,
            slug: createSlug(actualizeData.nazov),
            rodic: actualizeData.rodic,
            text: actualizeData.text,
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
        toast.success("Objekt bol vytvorený");
        await queryClient.invalidateQueries({ queryKey: ["admin_union"] });
        navigate("/admin/zvaz");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeParent = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      setActualizeData((prevData) => ({
        ...prevData,
        rodic: selectedOption.value,
      }));
    }
  };

  const getData2 = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/getuniondataonlyidname`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      setSelectOptions([
        { label: "Ziaden", value: "null" },
        ...responseData.map((item: any) => ({
          label: item.nazov,
          value: item.id,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData2();
  }, []);

  const handleDeletePhoto = (src: string) => {
    const new_pdf_data = actualizeData.fotky.filter((item) => item != src);
    setActualizeData((prevData) => ({
      ...prevData,
      fotky: new_pdf_data,
    }));
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

          formData.append("file", compressedFile);

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/admin/upload/photoUnion`,
            { fileName },
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
      e.target.value = "";
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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const fileName = file.name;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/upload/pdf`,
        { fileName },
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

  const handleTextChange = (field: string, value: string) => {
    setActualizeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <div className=" w-full">
        <StepBack />
        <Toaster />
        <h2>Nový objekt:</h2>

        <form className=" products_admin " onSubmit={handleAddNewObject}>
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
            <p>Rodič</p>
            <Select
              options={selectedOptions}
              onChange={handleChangeParent}
              value={selectedOptions.find(
                (option) => option.value === actualizeData.rodic
              )}
              className="relative z-[10000]"
            />
            <input
              type="text"
              name="rodic"
              className="w-[70%]"
              value={actualizeData?.rodic}
              maxLength={1000}
              readOnly
              required
            />
          </div>
          <div className="product_admin_row !flex-col items-start">
            <p className="text-left">Text:</p>
            <Tiptap
              content={actualizeData.text}
              onChange={(value) => handleTextChange("text", value)}
            />
          </div>
          <div className="product_admin_row">
            <p>Pdf:</p>
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
            </div>
          </div>
          <div className="product_admin_row">
            <p>Fotky:</p>
            <div className="flex flex-col">
              {actualizeData.fotky.map((object, index) => (
                <div className="flex flex-row gap-4 items-center">
                  <img
                    src={replaceS3UrlsWithCloudFront(object, "photoUnion")}
                    alt=""
                    className="w-24 h-24 object-cover"
                  />
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

export default AdminUnionPageNew;
