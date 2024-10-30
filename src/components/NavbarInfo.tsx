import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarInfoData } from "../lib/interface";

const NavbarInfo = () => {
  const [data, setData] = useState<NavbarInfoData[]>([]);
  const [data2, setData2] = useState<NavbarInfoData[]>([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/navbar/getnavbarinfodataopen`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: any = await response.json();
      const responseData_final: NavbarInfoData[] = responseData.Items;
      const sortedData = responseData_final.sort(
        (a, b) => a.poradie - b.poradie
      );
      setData(sortedData.slice(0, sortedData.length - 2));
      setData2(sortedData.slice(-2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-row gap-6 main_section !pt-0 !pb-0 justify-between">
      <div className="flex flex-row gap-[32px]">
        {data.map((object, index) =>
          object.typ === "link" ? (
            <Link className="text-white" key={index} to={object.link}>
              {object.nazov}
            </Link>
          ) : (
            <Link
              className="text-white"
              key={index}
              to={object.link}
              target="_blank"
            >
              {object.nazov}
            </Link>
          )
        )}
      </div>
      <div className="flex-row gap-[32px] hidden md:flex">
        {data2.map((object, index) =>
          object.typ === "link" ? (
            <Link className="text-white" key={index} to={object.link}>
              {object.nazov}
            </Link>
          ) : (
            <Link
              className="text-white"
              key={index}
              to={object.link}
              target="_blank"
            >
              {object.nazov}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default NavbarInfo;
