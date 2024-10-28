import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ActualEvent, API_URL_BASIC } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import IconCalendar from "../Icons/IconCalendar";
import IconLocation from "../Icons/IconLocation";

const EventDetailPage = () => {
  const [data, setData] = useState<ActualEvent>();
  const [data2, setData2] = useState<ActualEvent[]>([]);
  const { slug } = useParams<{ slug: string }>();

  const getData = async () => {
    try {
      const response = await fetch(`${API_URL_BASIC}/getactualevent/${slug}`, {
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

      if (responseData != null) {
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData2 = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getactualeventsexcept/${slug}`,
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

      if (responseData != null) {
        setData2(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (slug) {
      console.log(slug);
      getData();
      getData2();
    }
  }, [slug]);

  return (
    <div className="own_edge">
      <div className="main_section ">
        {data ? (
          <>
            <div className="flex items-center flex-col">
              <h1>{data?.nazov_vystavy}</h1>
              <div className="flex flex-row gap-6  ">
                <IconCalendar />
                <p className="font-medium">
                  {data.datum} {data.cas}
                </p>
              </div>
              <div className="flex flex-row gap-6  ">
                <IconLocation />
                <p className="font-medium">{data.miesto_podujatia}</p>
              </div>
              <img
                src={data.titulna_foto}
                width={900}
                height={900}
                className="rounded-[16px] max-w-[1080px] max-h-[459px] object-cover mt-8"
              />
            </div>

            <div className="max-w-[900px] m-auto mt-[80px]">
              <p>{data.text1}</p>
              <p className=" mt-[80px]">{data.text2}</p>
            </div>
          </>
        ) : (
          <div className="min-h-screen">
            <p>Loading...</p>
          </div>
        )}

        <div className="flex flex-row justify-between mt-[80px] items-center mb-[32px]">
          <h2 className="uppercase ">Ďalšie podujatia</h2>
          <ButtonWithArrow
            title="Zobraziť všetky"
            link={`/vystavy-a-podujatia`}
          />
        </div>

        {data2 ? (
          <div className="flex flex-col md:flex-row gap-[24px]">
            {data2.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] w-full max-w-[464px] hover:scale-[1.02] duration-200`}
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

export default EventDetailPage;
