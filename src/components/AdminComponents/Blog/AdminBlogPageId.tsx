import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { createSlug, isValidDate } from "../../../lib/functionsClient";
import { Blog } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminBlogPageId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [data, setData] = useState<Blog>();
  const [authorized, setAuthorized] = useState("ano");
  const token = localStorage.getItem("token");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<Blog>({
    id: "",
    nazov_blog: "",
    slug: "",
    datum: "",
    titulna_foto: "",
    popis1: "",
    foto1: "",
    popis2: "",
    foto2: "",
    popis3: "",
    foto3: "",
    pdf: "",
  });

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/blogs/getblog/${id}`,
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
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      setData(responseData);
      setActualizeData(responseData);
    } catch (error) {
      setAuthorized("nie");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
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
        getData();
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
        navigate("/admin/blog");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div>
      {data && authorized === "ano" && (
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
              <input
                type="text"
                name="titulna_foto"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.titulna_foto}
                required
              />
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
              <input
                type="text"
                name="foto1"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.foto1}
              />
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
              <p>Foto 2:</p>
              <input
                type="text"
                name="foto2"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.foto2}
              />
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
              <p>Foto 3:</p>
              <input
                type="text"
                name="foto3"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.foto3}
              />
            </div>
            <div className="product_admin_row">
              <p>Pdf:</p>
              <input
                type="text"
                name="foto1"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.pdf}
              />
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

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminBlogPageId;
