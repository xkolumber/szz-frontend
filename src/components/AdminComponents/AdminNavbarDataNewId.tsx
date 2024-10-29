import React, { useState } from "react";
import { API_URL_AMIN, NavbarInfoData } from "../../lib/interface";
import StepBack from "../StepBack";
import toast, { Toaster } from "react-hot-toast";
import AdminNotAuthorized from "./AdminNotAuthorized";
import { ClipLoader } from "react-spinners";

const AdminNavbarDataNewId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authorized] = useState("ano");
  const token = localStorage.getItem("token");

  const [actualizeData, setActualizeData] = useState<NavbarInfoData>({
    id: "",
    nazov: "",
    link: "",
    poradie: 0,
    typ: "link",
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

  const handleAddNavbarData = async (event: any) => {
    event.preventDefault();

    if (actualizeData.typ != "link" && actualizeData.typ != "pdf") {
      toast.error("Typ musí byť pdf alebo link ");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL_AMIN}/navbar/addnavbarinfodata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nazov: actualizeData.nazov,
          link: actualizeData.link,
          poradie: actualizeData.poradie,
          typ: actualizeData.typ,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Oznam bol pridaný");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Nový odkaz</h2>

          <form className=" products_admin " onSubmit={handleAddNavbarData}>
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

export default AdminNavbarDataNewId;
