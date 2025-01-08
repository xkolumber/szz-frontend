import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import {
  options_years,
  replaceS3UrlsWithCloudFront,
  webimages_link,
} from "../../lib/functionsClient";
import { Gallery } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import EventPagesSkeleton from "../EventComponents/EventPagesSkeleton";
import SeoElement from "../SeoElement";

const GalleryPage = () => {
  const [data, setData] = useState<Gallery[]>([]);

  let [searchParams] = useSearchParams();

  const [selectedYear, setSelectedYear] = useState({ value: "", label: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
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
          `${
            import.meta.env.VITE_API_URL
          }/admin/gallery/getgallerysorted/${rok}`,
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
        setIsChecked(false);

        const responseData = await response.json();

        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchParams && isChecked) {
      getData();
    }
  }, [searchParams, isChecked]);

  const handleChangeYear = async (selectedOption: any) => {
    setIsLoading(true);
    let strana = searchParams.get("strana") || "1";
    navigate(`?strana=${strana}&rok=${selectedOption.value}`);
    setSelectedYear(selectedOption);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/gallery/getgallerysorted/${
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
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <SeoElement
        slug={`galeria`}
        title="Galéria"
        description="Nahliadnite na zoznam našich galérii."
      />

      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="flex flex-col md:flex-row justify-between pt-8">
          <h2 className="uppercase text-center ">Galéria</h2>
          <div className="flex flex-row items-center gap-6 justify-center z-20">
            <p className="uppercase font-medium">Rok fotogalérie</p>
            <Select
              options={options_years}
              onChange={handleChangeYear}
              value={selectedYear}
            />
          </div>
        </div>

        <p className="hidden md:block">
          Vitajte v galérii Slovenského zväzu záhradkárov!
        </p>
        {!isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-8">
            {data &&
              data.map((object, index) => (
                <Link
                  className={`flex flex-col  rounded-[24px] w-full max-w-[464px] hover:scale-[1.02] duration-200`}
                  key={index}
                  to={`/galeria/${object.id}`}
                >
                  {object.fotky.length > 0 ? (
                    <div key={index} className="relative w-full h-[280px]">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[16px]"></div>
                      <img
                        src={replaceS3UrlsWithCloudFront(
                          object.fotky[0],
                          "imagesalll"
                        )}
                        className="rounded-[16px] object-cover h-[280px] z-10 relative w-full"
                      />
                    </div>
                  ) : (
                    <img
                      src={`${webimages_link + "gray.png"}`}
                      className="rounded-[16px] object-cover h-[280px]"
                    />
                  )}

                  <h5 className=" line-clamp-1 mt-4 mb-2">{object.nazov}</h5>
                  <p className="opacity-60 ">{object.datum}</p>
                </Link>
              ))}
          </div>
        ) : (
          <EventPagesSkeleton />
        )}
        {data.length === 0 && !isLoading && (
          <p>So zadanými kritériami sa zatiaľ nenašla žiadna galéria.</p>
        )}
        {!isLoading && (
          <img
            src={`${webimages_link + "icons/icon_gallery_left.svg"}`}
            className="absolute h-[578px] w-[373px] -left-40 top-[40%] hidden 3xl:block"
          />
        )}

        {!isLoading && (
          <img
            src={`${webimages_link + "icons/icon_gallery_right.svg"}`}
            className="absolute h-[578px] w-[373px] -right-40 top-[20%] hidden 3xl:block"
          />
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
