import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import {
  options_months,
  options_years,
  options_years_plus_one,
  replaceS3UrlsWithCloudFront,
} from "../../lib/functionsClient";
import { ActualEvent } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import IconCalendar from "../Icons/IconCalendar";
import SeoElement from "../SeoElement";
import EventPagesSkeleton from "./EventPagesSkeleton";

const EventsPage = () => {
  const [data, setData] = useState<ActualEvent[]>([]);
  const [selectedYear, setSelectedYear] = useState({ value: "", label: "" });
  const [selectedMonth, setSelectedMonth] = useState({ value: "", label: "" });
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      let rok = searchParams.get("rok") || new Date().getFullYear().toString();
      let mesiac = searchParams.get("mesiac") || "-1";
      let stat = searchParams.get("stat") || "vsetky";

      if (
        !searchParams.has("rok") ||
        !searchParams.has("mesiac") ||
        !searchParams.has("stat")
      ) {
        navigate(`?rok=${rok}&mesiac=${mesiac}&stat=${stat}`);
      }

      const selectedYear = options_years.find((object) => object.value === rok);
      if (selectedYear) {
        setSelectedYear(selectedYear);
      }

      if (parseInt(mesiac) !== -1) {
        const adjustedMonth = (parseInt(mesiac) - 1).toString();
        const selectedMonth = options_months.find(
          (object) => object.value === adjustedMonth
        );

        if (selectedMonth) {
          setSelectedMonth(selectedMonth);
        }
      } else {
        const defaultMonth = options_months[0];
        setSelectedMonth(defaultMonth);
      }

      if (stat === "vsetky" || stat === "zvaz") {
        setCountry(stat);
      } else {
        setCountry("vsetky");
      }

      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeYear = async (selectedOption: any) => {
    setSelectedYear(selectedOption);
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("rok", selectedOption.value);
    navigate(`?${newSearchParams.toString()}`);
  };
  const handleChangeMonth = async (selectedOption: any) => {
    setSelectedMonth(selectedOption);
    const newSearchParams = new URLSearchParams(window.location.search);
    const month_correct = parseInt(selectedOption.value);
    if (selectedOption.value === "-1") {
      newSearchParams.set("mesiac", month_correct.toString());
    } else {
      newSearchParams.set("mesiac", (month_correct + 1).toString());
    }

    navigate(`?${newSearchParams.toString()}`);
  };

  const handleChangeCountry = (typ: string) => {
    if (typ === country) {
      setCountry("vsetky");
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("stat", "vsetky");
      navigate(`?${newSearchParams.toString()}`);
    } else {
      setCountry(typ);
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("stat", typ);
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (selectedYear && selectedMonth && country) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/events/getactualeventssorted/${
            selectedYear.value
          }/${selectedMonth.value}/${country}`,
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
      }
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth && selectedYear && country) {
      fetchData();
    }
  }, [selectedMonth, selectedYear, country]);

  return (
    <div className="own_edge min-h-screen overflow-hidden relative">
      <SeoElement
        title="Tipy na výstavy a aktivity zväzu"
        description="Zoznam tipov na výstavy a aktivity zväzu."
      />

      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="uppercase text-center pt-4">
          Tipy na výstavy a aktivity zväzu
        </h2>
        <div className="flex flex-col md:flex-row justify-center mb-[40px] mt-[20px] z-50 relative">
          <div className="flex flex-row items-center gap-6 mr-[40px]">
            <p className="uppercase font-medium w-[60px]">Mesiac</p>
            <Select
              options={options_months}
              onChange={handleChangeMonth}
              value={selectedMonth}
            />
          </div>

          <div className="flex flex-row items-center gap-6 pt-4 md:pt-0">
            <p className="uppercase font-medium w-[60px] ">Rok: </p>
            <Select
              options={options_years_plus_one}
              onChange={handleChangeYear}
              value={selectedYear}
            />
          </div>
          <div className="litle_line"></div>
          <div className="flex flex-row items-center gap-[40px] pt-8 md:pt-0">
            <h6
              className={`uppercase cursor-pointer ${
                country === "vsetky" && "text-[#6B9156]"
              }`}
              onClick={() => handleChangeCountry("vsetky")}
            >
              Všetky
            </h6>
            <h6
              className={`uppercase cursor-pointer  ${
                country === "zvaz" && "text-[#6B9156]"
              }`}
              onClick={() => handleChangeCountry("zvaz")}
            >
              AKTIVITY SZZ OV/MV/ZO,o.j.z.
            </h6>
          </div>
        </div>

        {!isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {data &&
              data.map((object, index) => (
                <Link
                  className={`flex flex-col  rounded-[24px] w-full  hover:scale-[1.02] duration-200`}
                  key={index}
                  to={`/vystavy-a-podujatia/${object.slug}`}
                >
                  <div key={index} className="relative w-full h-[280px]">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[16px]"></div>
                    {object.titulna_foto ? (
                      <img
                        src={replaceS3UrlsWithCloudFront(
                          object.titulna_foto,
                          "blogphoto"
                        )}
                        // src={object.titulna_foto}
                        className="rounded-[16px] w-full h-full object-cover relative z-10 cursor-pointer hover:scale-[1.02] duration-200"
                      />
                    ) : (
                      <img
                        src={"/gray.png"}
                        className="rounded-[16px] w-full h-full object-cover relative z-10 cursor-pointer hover:scale-[1.02] duration-200"
                      />
                    )}
                  </div>
                  <div className="flex flex-row gap-6 pt-[8px] lg:pt-[24px] opacity-60">
                    <IconCalendar />
                    <p className="font-medium">
                      {object.datum_den}.{object.datum_mesiac}.
                      {object.datum_rok}{" "}
                      {object.datum_koniec && `- ${object.datum_koniec}`}
                    </p>
                  </div>

                  <h5 className="pt-[8px] line-clamp-1">
                    {object.nazov_vystavy}
                  </h5>
                </Link>
              ))}
          </div>
        ) : (
          <EventPagesSkeleton />
        )}
        {data.length === 0 && !isLoading && (
          <p>So zadanými kritériami sa zatiaľ nevyskutuje žiadna udalosť.</p>
        )}
        <img
          src={"/icons/icon_event_left.svg"}
          className="absolute h-[578px] w-[373px] -left-40 top-[60%] hidden 3xl:block"
        />
        <img
          src={"/icons/icon_event_right.svg"}
          className="absolute h-[578px] w-[373px] -right-40 top-[10%] hidden 3xl:block"
        />
      </div>
    </div>
  );
};

export default EventsPage;
