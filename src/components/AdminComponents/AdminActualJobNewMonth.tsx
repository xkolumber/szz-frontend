import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ActualJob } from "../../lib/interface";
import StepBack from "../StepBack";
import AdminNotAuthorized from "./AdminNotAuthorized";

const AdminActualJobNewMonth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [authorized] = useState("ano");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<ActualJob>({
    id: "",
    mesiac: "",
    link: "",
    text: "",
    farba: "",
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

  const handleAddMonth = async (event: any) => {
    event.preventDefault();
    if (!actualizeData.farba.startsWith("#")) {
      toast.error("Farba musí začínať s #");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/addactualjob`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mesiac: actualizeData.mesiac,
            link: actualizeData.link,
            text: actualizeData.text,
            farba: actualizeData.farba,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Mesiac bol pridaný");
        navigate("/admin/aktualne-prace");
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
          <h2>Nový mesiac</h2>

          <form className=" products_admin " onSubmit={handleAddMonth}>
            <div className="product_admin_row">
              <p>Mesiac:</p>
              <input
                type="text"
                name="mesiac"
                onChange={handleChange}
                className="w-[70%]"
                maxLength={50}
                value={actualizeData?.mesiac}
                required
              />
            </div>
            <div className="product_admin_row">
              <p>Link PDF:</p>
              <input
                type="text"
                name="link"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.link}
                maxLength={1000}
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
              <p>Farba mesiacu: '#ffffff' </p>
              <input
                type="text"
                name="farba"
                onChange={handleChange}
                className="w-[70%]"
                value={actualizeData?.farba}
                maxLength={10}
                required
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
            </div>
          </form>
        </div>
      )}

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminActualJobNewMonth;
