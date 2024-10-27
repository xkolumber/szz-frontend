import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { API_URL_BASIC, UnionData } from "../../lib/interface";
import IconArrowUp from "../Icons/IconArrowUp";

const UnionPage = () => {
  const [data, setData] = useState<UnionData[]>([]);
  const [choosenUnionData, setChoosenUnionData] = useState<UnionData>();
  const [open, setOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [choosenAlbum, setChoosenAlbum] = useState<SlideImage[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch(`${API_URL_BASIC}/getdataunion`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: UnionData[] = await response.json();

      let sekcia = searchParams.get("sekcia");
      let podsekcia = searchParams.get("podsekcia");
      let predmet = searchParams.get("predmet");

      if (sekcia) {
        setCategory(sekcia);
        if (podsekcia) {
          if (predmet) {
            const findItem = responseData.find((item) => item.slug === predmet);
            setSubcategory(podsekcia);
            if (findItem) {
              setSubSubCategory(findItem?.slug);
              setChoosenUnionData(findItem);
            }
          } else {
            setSubcategory(podsekcia);
            const findItem = responseData.find(
              (item) => item.slug === podsekcia
            );
            if (findItem) {
              setSubcategory(findItem?.slug);
              setChoosenUnionData(findItem);
            }
          }
        } else {
          const findItem = responseData.find((item) => item.slug === sekcia);
          if (findItem) {
            setChoosenUnionData(findItem);
          } else {
            setChoosenUnionData(responseData[0]);
          }
        }
      } else {
        navigate(`?sekcia=${responseData[0].slug}`);
        setCategory(responseData[0].slug);
        setChoosenUnionData(responseData[0]);
      }

      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenGallery = (choosenArticel: UnionData, index: number) => {
    const transformedAlbum = choosenArticel.fotky.map((url) => ({ src: url }));
    setChoosenAlbum(transformedAlbum);
    setOpen(true);
    setInitialSlide(index);
  };

  const handleClickedCategory = (slug: string) => {
    const findItem = data.find((item) => item.slug === slug);
    if (findItem) {
      setCategory(slug);
      setSubcategory("");
      setChoosenUnionData(findItem);
      navigate(`?sekcia=${slug}`);
    }
  };

  const handleClickedSubCategory = (slug: string) => {
    const findItem = data.find((item) => item.slug === slug);
    if (findItem) {
      setChoosenUnionData(findItem);
      setSubcategory(slug);
      setSubSubCategory("");
      let podsekcia = searchParams.get("podsekcia");
      if (podsekcia != slug) {
        navigate(
          `${location.pathname}?${searchParams.toString()}&podsekcia=${slug}`
        );
      } else {
        searchParams.delete("predmet");
        navigate(`${location.pathname}?${searchParams.toString()}`);
      }
    }
  };

  const handleClickedSubSubCategory = (slug: string) => {
    const findItem = data.find((item) => item.slug === slug);
    if (findItem) {
      setChoosenUnionData(findItem);
      setSubSubCategory(slug);

      const searchParams = new URLSearchParams(location.search);
      const currentPredmet = searchParams.get("predmet");
      if (currentPredmet !== slug) {
        searchParams.set("predmet", slug);
        navigate(`${location.pathname}?${searchParams.toString()}`);
      }
    }
  };
  return (
    <div className="own_edge">
      <div className="main_section !pt-0">
        <h2 className="uppercase ">
          Sekcia pre <span className="text-[#6B9156]">zväz</span>
        </h2>
        <div className="flex flex-row mt-[40px]">
          <div className="max-w-[400px] flex flex-col w-full">
            {data ? (
              data.map(
                (object, index) =>
                  object.rodic === null && (
                    <div className="flex flex-col" key={index}>
                      <div className="flex flex-row justify-between items-center pt-[12px] pb-[12px]">
                        <h6
                          className="cursor-pointer uppercase"
                          onClick={() => handleClickedCategory(object.slug)}
                        >
                          {object.nazov}
                        </h6>
                        <IconArrowUp choosen={object.slug === category} />
                      </div>

                      {data.map(
                        (object2) =>
                          object2.rodic === object.id &&
                          category === object.slug && (
                            <div className="flex flex-col">
                              <div className=" light_green rounded-[8px] pl-[24px] pr-[24px] pt-[16px] pb-[16px] ">
                                <div className="flex flex-row justify-between items-center">
                                  <h6
                                    className="cursor-pointer uppercase"
                                    onClick={() =>
                                      handleClickedSubCategory(object2.slug)
                                    }
                                  >
                                    {object2.nazov}
                                  </h6>
                                  <IconArrowUp
                                    choosen={object2.slug === subCategory}
                                  />
                                </div>
                                {data.map(
                                  (object3) =>
                                    object3.rodic === object2.id &&
                                    subCategory === object2.slug && (
                                      <div
                                        className={`flex flex-row justify-between items-center light_green rounded-[8px] pl-[24px] pr-[24px] pt-[16px] pb-[16px] mb-4 mt-4 ${
                                          subSubCategory === object3.slug &&
                                          "!bg-[#298040]"
                                        } `}
                                      >
                                        <p
                                          className={`cursor-pointer uppercase line-clamp-1 ${
                                            subSubCategory === object3.slug &&
                                            "text-white"
                                          } `}
                                          onClick={() =>
                                            handleClickedSubSubCategory(
                                              object3.slug
                                            )
                                          }
                                        >
                                          {object3.nazov}
                                        </p>
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  )
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {choosenUnionData ? (
            <div className="pl-[80px]">
              <h3>{choosenUnionData?.nazov}</h3>
              <p className="mt-[40px]">{choosenUnionData?.text}</p>
              {choosenUnionData.pdf.length > 0 && (
                <>
                  <h5 className="mt-[40px]">Dokumenty na stiahnutie</h5>
                  <div className="flex flex-row gap-4">
                    {" "}
                    {choosenUnionData?.pdf.map((object, index) => (
                      <Link
                        to={object}
                        className="btn btn--tertiary"
                        target="_blank"
                      >
                        Dokument {index}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {choosenUnionData.fotky.length > 0 && (
                <>
                  <h5 className="mt-[40px]">Súvisiace fotogragie</h5>
                  <div className="flex flex-row gap-4">
                    {" "}
                    {choosenUnionData?.fotky.map((object, index) => (
                      <img
                        src={object}
                        key={index}
                        className="max-w-[150px] max-h-[150px] rounded-[16px] w-full h-full object-cover cursor-pointer hover:scale-[1.02] duration-200"
                        onClick={() =>
                          handleOpenGallery(choosenUnionData, index)
                        }
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {open && (
          <Lightbox
            open={open}
            slides={choosenAlbum}
            close={() => setOpen(false)}
            index={initialSlide}
          />
        )}
      </div>
    </div>
  );
};

export default UnionPage;
