import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ActualEvent } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import IconCalendar from "../Icons/IconCalendar";
import Select from "react-select";
import { options_months, options_years } from "../../lib/functionsClient";

const EventsPage = () => {
  const [data, setData] = useState<ActualEvent[]>([]);
  const [selectedYear, setSelectedYear] = useState({ value: "", label: "" });
  const [selectedMonth, setSelectedMonth] = useState({ value: "", label: "" });
  const [country, setCountry] = useState("");

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedYear(options_years[0]);
    setSelectedMonth(options_months[0]);
    const getData = async () => {
      try {
        let rok = searchParams.get("rok") || new Date().getFullYear();
        let mesiac = searchParams.get("mesiac") || new Date().getMonth() + 1;
        let stat = searchParams.get("stat");

        if (
          !searchParams.has("mesiac") ||
          !searchParams.has("rok") ||
          !searchParams.has("stat")
        ) {
          navigate(`?rok=${rok}&stat=vsetky`);
          setSelectedYear(options_years[0]);
        }
        if (stat) {
          if (stat === "sk" || stat === "zah") {
            setCountry(stat);
          } else {
            setCountry("vsetky");
          }
        }
        if (rok) {
          const findlabel = options_years.find(
            (object) => object.value === searchParams.get("rok")
          );
          if (findlabel) {
            setSelectedYear(findlabel);
          }
        }

        if (mesiac) {
          const findlabel = options_months.find(
            (object) => object.value === searchParams.get("mesiac")
          );
          if (findlabel) {
            setSelectedMonth(findlabel);
          }
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/getactualevents`,
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

  const handleChangeYear = async (selectedOption: any) => {
    setSelectedYear(selectedOption);
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("rok", selectedOption.value);
    navigate(`?${newSearchParams.toString()}`);
    // let strana = searchParams.get("strana") || "1";
    // navigate(`?strana=${strana}&rok=${selectedOption.value}`);
    // setSelectedYear(selectedOption);
    // const response = await fetch(
    //   `${import.meta.env.VITE_API_URL}/api/getallgaleries/${strana}/${
    //     selectedOption.value
    //   }`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    // const responseData = await response.json();
    // setData(responseData);
  };
  const handleChangeMonth = async (selectedOption: any) => {
    setSelectedMonth(selectedOption);
    const newSearchParams = new URLSearchParams(window.location.search);
    const month_correct = parseInt(selectedOption.value);
    newSearchParams.set("mesiac", (month_correct + 1).toString());
    navigate(`?${newSearchParams.toString()}`);
  };

  const handleChangeCountry = (typ: string) => {
    setCountry(typ);
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("stat", typ);
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="own_edge min-h-screen">
      <div className="main_section">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/blog`} />
        <h2 className="uppercase text-center">výstavy a podujatia</h2>
        <div className="flex flex-col md:flex-row justify-center mb-[40px] mt-[20px]">
          <div className="flex flex-row items-center gap-6 mr-[40px]">
            <p className="uppercase font-medium">Mesiac</p>
            <Select
              options={options_months}
              onChange={handleChangeMonth}
              value={selectedMonth}
            />
          </div>

          <div className="flex flex-row items-center gap-6 ">
            <p className="uppercase font-medium">Rok: </p>
            <Select
              options={options_years}
              onChange={handleChangeYear}
              value={selectedYear}
            />
          </div>
          <div className="litle_line"></div>
          <div className="flex flex-row items-center gap-[40px] ">
            <h6
              className={`uppercase cursor-pointer ${
                country === "sk" && "text-[#6B9156]"
              }`}
              onClick={() => handleChangeCountry("sk")}
            >
              Slovenské
            </h6>
            <h6
              className={`uppercase cursor-pointer  ${
                country === "zah" && "text-[#6B9156]"
              }`}
              onClick={() => handleChangeCountry("zah")}
            >
              Zahraničné
            </h6>
          </div>
        </div>

        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {data.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] w-full  hover:scale-[1.02] duration-200`}
                key={index}
                to={`/vystavy-a-podujatia/${object.slug}`}
              >
                <img src={object.titulna_foto} className="rounded-[16px]" />
                <div className="flex flex-row gap-6 pt-[8px] lg:pt-[24px] opacity-60">
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
