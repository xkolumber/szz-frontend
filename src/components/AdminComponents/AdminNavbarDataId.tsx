import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { API_URL_AMIN, NavbarInfoData } from "../../lib/interface";
import StepBack from "../StepBack";
import AdminNotAuthorized from "./AdminNotAuthorized";

const AdminNavbarDataId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<NavbarInfoData>();
  const [authorized, setAuthorized] = useState("ano");
  const token = localStorage.getItem("token");
  const { id } = useParams<{ id: string }>();

  const [actualizeData, setActualizeData] = useState<NavbarInfoData>({
    id: "",
    nazov: "",
    link: "",
    poradie: 0,
    typ: "link",
  });

  const getData = async () => {
    try {
      const response = await fetch(
        `${API_URL_AMIN}/navbar/getnavbarinfodataid/${id}`,
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

    if (actualizeData.typ != "link" && actualizeData.typ != "pdf") {
      toast.error("Typ musí byť pdf alebo link ");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL_AMIN}/navbar/updatenavbarinfodata/`,
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
            link: actualizeData.link,
            poradie: actualizeData.poradie,
            typ: actualizeData.typ,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Oznam bol aktualizovaný");
        getData();
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {data && authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Úprava: {data.nazov}</h2>

          <form className=" products_admin " onSubmit={handleSaveProduct}>
            <div className="product_admin_row">
              <p>Názov:</p>
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
              <p>Link:</p>
              <input
                type="text"
                name="link"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.link}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Poradie:</p>
              <input
                type="number"
                name="poradie"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.poradie}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Typ odkazu: 'pdf' alebo 'link'</p>
              <input
                type="text"
                name="typ"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.typ}
                required
              />
            </div>
            <button
              className={`btn btn--tertiary !mt-4 ${
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
          </form>
        </div>
      )}

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminNavbarDataId;
