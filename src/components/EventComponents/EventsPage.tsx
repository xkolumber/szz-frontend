import React, { useEffect, useState } from "react";
import { ActualEvent } from "../../lib/interface";
import IconCalendar from "../Icons/IconCalendar";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [data, setData] = useState<ActualEvent[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/getactualevents",
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
        <h2 className="uppercase text-center">výstavy a podujatia</h2>
        {data ? (
          <div className="flex flex-col md:flex-row gap-[24px]">
            {data.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] w-full max-w-[464px]`}
                key={index}
                to={`/vystavy-a-podujatia/${object.slug}`}
              >
                <img
                  src={object.titulna_foto}
                  width={400}
                  height={400}
                  className="rounded-[16px]"
                />
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

export default EventsPage;
