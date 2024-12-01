import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { isValidDate, isValidYear } from "../../../lib/functionsClient";
import { Gallery } from "../../../lib/interface";
import IconTrash from "../../Icons/IconTrash";
import StepBack from "../../StepBack";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  data: Gallery;
  onDataUpdated: () => void;
}

const AdminGalleryPageIdComponent = ({ data, onDataUpdated }: Props) => {
  const { rok } = useParams<{ rok: string }>();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [actualizeData, setActualizeData] = useState<Gallery>(data);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

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
      const updatedArray = [...(prevData[title as keyof Gallery] as string[])];
      updatedArray[index] = event.target.value;
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
    if (!isValidYear(actualizeData.rok)) {
      toast.error("Rok je v nesprávnom tvare");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/gallery/updategalleryalbum`,
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
            datum: actualizeData.datum,
            fotky: actualizeData.fotky,
            rok: actualizeData.rok,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Blog bol aktualizovaný");
        await queryClient.refetchQueries({
          queryKey: ["admin_galleries", rok],
        });
        onDataUpdated();
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
        `${import.meta.env.VITE_API_URL}/admin/gallery/deletegalleryalbum/${
          data!.id
        }`,
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
        toast.success("Album bol odstránený");
        await queryClient.refetchQueries({
          queryKey: ["admin_galleries", rok],
        });
        navigate(`/admin/galeria/${rok}`);
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoadingDelete(false);
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

  const handleDeletePhoto = (src: string) => {
    const new_pdf_data = actualizeData.fotky.filter((item) => item != src);
    setActualizeData((prevData) => ({
      ...prevData,
      fotky: new_pdf_data,
    }));
  };

  const handleAddInputPhoto = () => {
    setActualizeData((prevData) => ({
      ...prevData,
      fotky: [...prevData.fotky, ""],
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

  const handleShowBiggerIamge = (src: string) => {
    setClickedPhoto(src);
    setOpenPopUp(true);
  };

  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Úprava galérie: {data.nazov}</h2>

          <form className=" products_admin " onSubmit={handleSaveProduct}>
            <div className="product_admin_row">
              <p>Názov galérie:</p>
              <input
                type="text"
                name="nazov"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.nazov}
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
              <p>Rok:</p>
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
              <p>Fotky:</p>
              <div className="flex flex-col">
                {actualizeData.fotky.map((object, index) => (
                  <div className="flex flex-row gap-4 items-center" key={index}>
                    {object != "" && (
                      <img
                        width={70}
                        height={70}
                        src={object}
                        className="h-[70px] object-cover rounded-[16px] cursor-pointer"
                        style={{ imageRendering: "pixelated" }}
                        onClick={() => handleShowBiggerIamge(object)}
                      />
                    )}

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

export default AdminGalleryPageIdComponent;
