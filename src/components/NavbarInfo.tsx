import { useEffect, useState } from "react";
import { API_URL_BASIC, NavbarInfoData } from "../lib/interface";
import { Link } from "react-router-dom";

const NavbarInfo = () => {
  const [data, setData] = useState<NavbarInfoData[]>([]);
  const [data2, setData2] = useState<NavbarInfoData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL_BASIC}/getdatanavbarinfo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData: NavbarInfoData[] = await response.json();
        const sortedData = responseData.sort((a, b) => a.poradie - b.poradie);
        setData(sortedData.slice(0, 4));
        const highestItems = sortedData.slice(-2);

        setData2(highestItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
