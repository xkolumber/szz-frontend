import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Faq } from "../../../lib/interface";
import StepBack from "../../StepBack";

import { useQueryClient } from "@tanstack/react-query";
import Tiptap from "../../TipTapEditor/TipTap";

const AdminFaqPageNew = () => {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<Faq>({
    id: "",
    otazka: "",
    odpoved: "",
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

  const handleSaveProduct = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/faq/addfaq`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            otazka: actualizeData.otazka,
            odpoved: actualizeData.odpoved,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const responseData = await response.json();

      if (responseData.$metadata.httpStatusCode === 200) {
        toast.success("Faq bol úspešne vytvorený");
        await queryClient.refetchQueries({ queryKey: ["admin_faq"] });
        navigate("/admin/otazky-a-odpovede");
      }
    } catch (error) {
      toast.error("niekde nastala chyba");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
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
        <h2>Nová otázka / odpoveď: </h2>

        <form className=" products_admin " onSubmit={handleSaveProduct}>
          <div className="product_admin_row">
            <p>Otázka:</p>
            <input
              type="text"
              name="otazka"
              onChange={handleChange}
              className="w-[70%]"
              value={actualizeData?.otazka}
              required
            />
          </div>
          <div className="product_admin_row !flex-col items-start">
            <p className="text-left">Odpoveď:</p>
            <Tiptap
              content={actualizeData.odpoved}
              onChange={(value) => handleTextChange("odpoved", value)}
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
                "Pridať"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFaqPageNew;
