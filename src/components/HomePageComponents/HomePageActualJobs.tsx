import { useEffect, useState } from "react";
import { ActualJob } from "../../lib/interface";

const HomePageActualJobs = () => {
  const [data, setData] = useState<ActualJob[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/getactualjobs",
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
    <div className="bg-[#EDF3DD] own_edge">
      <div className="main_section">
        <h2 className="uppercase">Aktuálne práce v záhrade</h2>
        {data ? (
          <div className="flex flex-col md:flex-row gap-[24px]">
            {data.map((object, index) => (
              <div
                className={`flex flex-col p-[24px] rounded-[16px] w-full max-w-[400px]`}
                key={index}
                style={{ background: object.farba }}
              >
                <div className="flex flex-row justify-between items-center">
                  <h3 className="uppercase text-white">{object.mesiac}</h3>
                  <button className="btn btn--white">Pozrieť práce</button>
                </div>
                <p className="text-white">{object.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HomePageActualJobs;
