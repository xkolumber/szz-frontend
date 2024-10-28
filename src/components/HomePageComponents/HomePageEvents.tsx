import React, { useEffect, useState } from "react";
import ButtonWithArrow from "../ButtonWithArrow";
import { Link } from "react-router-dom";
import { ActualEvent, API_URL_BASIC } from "../../lib/interface";
import IconCalendar from "../Icons/IconCalendar";

const HomePageEvents = () => {
  const [data, setData] = useState<ActualEvent[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL_BASIC}/getactualevents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);
  return (
    <div className="own_edge">
      <div className="main_section">
        <div className="flex flex-row justify-between  items-center mb-[32px]">
          <h2 className="uppercase">Aktuálne výstavy a podujatia</h2>
          <ButtonWithArrow
            title="Zobraziť všetky"
            link={`/vystavy-a-podujatia`}
          />
        </div>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {data.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] max-w-[464px]  w-full hover:scale-[1.02] duration-200 `}
                key={index}
                to={`/vystavy-a-podujatia/${object.slug}`}
              >
                {" "}
                <img src={object.titulna_foto} className="rounded-[16px]" />
                <div className="flex flex-row gap-6 pt-[24px] opacity-60">
                  <IconCalendar />
                  <p className="font-medium">
                    {object.datum} {object.cas}
                  </p>
                </div>
                <h5 className="pt-[8px]">{object.nazov_vystavy}</h5>
              </Link>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HomePageEvents;
