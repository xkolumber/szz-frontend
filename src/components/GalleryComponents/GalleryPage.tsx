import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Gallery } from "../../lib/interface";
import { options_years } from "../../lib/functionsClient";

const GalleryPage = () => {
  const [data, setData] = useState<Gallery[]>([]);

  let [searchParams] = useSearchParams();

  const [selectedYear, setSelectedYear] = useState({ value: "", label: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        let strana = searchParams.get("strana") || "1";
        let rok = searchParams.get("rok") || new Date().getFullYear();
        if (!searchParams.has("strana") || !searchParams.has("rok")) {
          navigate(`?strana=${strana}&rok=${rok}`);
          setSelectedYear(options_years[0]);
        }
        if (searchParams.get("rok")) {
          const findlabel = options_years.find(
            (object) => object.value === searchParams.get("rok")
          );
          if (findlabel) {
            setSelectedYear(findlabel);
          }
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/getallgaleries/${strana}/${rok}`,
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
    let strana = searchParams.get("strana") || "1";
    navigate(`?strana=${strana}&rok=${selectedOption.value}`);
    setSelectedYear(selectedOption);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/getallgaleries/${strana}/${
        selectedOption.value
      }`,
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
  };

  return (
    <div className="own_edge min-h-screen">
      <div className="main_section">
        <div className="flex flex-row justify-between">
          <h2 className="uppercase ">Galéria</h2>
          <div className="flex flex-row items-center gap-6">
            <p className="uppercase font-medium">Rok fotogalérie</p>
            <Select
              options={options_years}
              onChange={handleChangeYear}
              value={selectedYear}
            />
          </div>
        </div>

        <p>Vitajte v galérii Slovenského zväzu záhradkárov!</p>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-8">
            {data.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] w-full max-w-[464px] hover:scale-[1.02] duration-200`}
                key={index}
                to={`/galeria/${object.id}`}
              >
                <img src={object.fotky[0]} className="rounded-[16px]" />

                <h5 className="pt-[8px]">{object.nazov}</h5>
                <p className="opacity-60">{object.datum}</p>
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

export default GalleryPage;
