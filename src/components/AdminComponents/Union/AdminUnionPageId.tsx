import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { createSlug } from "../../../lib/functionsClient";
import { SelectOption, UnionData } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";
import IconTrash from "../../Icons/IconTrash";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const AdminUnionPageId = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [data, setData] = useState<UnionData>();
  const [authorized, setAuthorized] = useState("");
  const token = localStorage.getItem("token");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedOptions, setSelectOptions] = useState<SelectOption[]>([]);

  const [actualizeData, setActualizeData] = useState<UnionData>({
    id: "",
    nazov: "",
    slug: "",
    rodic: "",
    text: "",
    pdf: [],
    fotky: [],
  });

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/getunionid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setAuthorized("nie");
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setAuthorized("ano");

      setData(responseData);
      setActualizeData(responseData);
    } catch (error) {
      setAuthorized("nie");
      console.error("Error fetching data:", error);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setAuthorized("nie");
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      setSelectOptions([
        { label: "Ziaden", value: "null" },
        ...responseData
          .filter((item: any) => item.id !== id)
          .map((item: any) => ({
            label: item.nazov,
            value: item.id,
          })),
      ]);
    } catch (error) {
      setAuthorized("nie");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    getData2();
  }, []);

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

  const handleSaveProduct = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/updateunion/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: data?.id,
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
        toast.success("Objekt bol aktualizovaný");
        getData();
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
        `${import.meta.env.VITE_API_URL}/admin/union/deleteunion/${data!.id}`,
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
        toast.success("Objekt bol odstránený");
        await queryClient.invalidateQueries({ queryKey: ["admin_union"] });
        navigate("/admin/zvaz");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoadingDelete(false);
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

  const handleDeleteObjectPdf = (nazov: string, link: string) => {
    const new_pdf_data = actualizeData.pdf.filter(
      (item) => item.nazov != nazov && item.link != link
    );
    setActualizeData((prevData) => ({
      ...prevData,
      pdf: new_pdf_data,
    }));
  };

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
      pdf: [...prevData.pdf, { nazov: "", link: "" }],
    }));
  };

  const handleAddInputPhoto = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      fotky: [...prevData.fotky, ""],
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

  return (
    <div>
      {data && authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Úprava dokumentu: {data.nazov}</h2>

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
            <div className="product_admin_row ">
              <p>Rodič</p>
              <Select
                options={selectedOptions}
                onChange={handleChangeParent}
                value={selectedOptions.find(
                  (option) => option.value === actualizeData.rodic
                )}
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
            <div className="product_admin_row">
              <p>Text:</p>
              <input
                type="text"
                name="text"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.text}
                maxLength={250}
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
              <p>Fotky:</p>
              <div className="flex flex-col">
                {actualizeData.fotky.map((object, index) => (
                  <div className="flex flex-row gap-4 items-center">
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

export default AdminUnionPageId;
