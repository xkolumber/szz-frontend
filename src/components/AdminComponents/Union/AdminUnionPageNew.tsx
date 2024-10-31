import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { SelectOption, UnionData } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";
import { createSlug, empty_three_values } from "../../../lib/functionsClient";
import Select from "react-select";

const AdminUnionPageNew = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectOptions] = useState<SelectOption[]>([]);

  const [authorized, setAuthorized] = useState("ano");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [actualizeData, setActualizeData] = useState<UnionData>({
    id: "",
    nazov: "",
    slug: "",
    rodic: "",
    text: "",
    pdf: empty_three_values,
    fotky: empty_three_values,
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

  const handleAddNewObject = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/union/addunion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
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
        toast.success("Objekt bol aktualizovaný");
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
        ...responseData.map((item: any) => ({
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
    getData2();
  }, []);

  return (
    <div>
      {authorized === "ano" && (
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
                {actualizeData.pdf.map((size, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`pdf${index}`}
                    value={size}
                    onChange={(e) => handleChangeItemArray("pdf", index, e)}
                    className="md:!w-[450px] mt-2"
                  />
                ))}
              </div>
            </div>
            <div className="product_admin_row">
              <p>Fotky:</p>
              <div className="flex flex-col">
                {actualizeData.fotky.map((size, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`fotky${index}`}
                    value={size}
                    onChange={(e) => handleChangeItemArray("fotky", index, e)}
                    className="md:!w-[450px] mt-2"
                  />
                ))}
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
      )}

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminUnionPageNew;
