import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { UnionData } from "../../lib/interface";
import IconArrowUp from "../Icons/IconArrowUp";
import ButtonWithElement from "../ButtonWithElement";
import IconDownload from "../Icons/IconDownload";

interface Props {
  data: UnionData[];
}

const UnionPageElements = ({ data }: Props) => {
  const [choosenUnionData, setChoosenUnionData] = useState<UnionData>();
  const [open, setOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [choosenAlbum, setChoosenAlbum] = useState<SlideImage[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOpenGallery = (choosenArticel: UnionData, index: number) => {
    const transformedAlbum = choosenArticel.fotky.map((url) => ({ src: url }));
    setChoosenAlbum(transformedAlbum);
    setOpen(true);
    setInitialSlide(index);
  };

  const handleClickedCategory = (slug: string) => {
    const findItem = data?.find((item) => item.slug === slug);
    if (findItem) {
      setCategory(slug);
      setSubcategory("");
      setChoosenUnionData(findItem);
      navigate(`?sekcia=${slug}`);
    }
  };

  const handleClickedSubCategory = (slug: string) => {
    const findItem = data?.find((item) => item.slug === slug);
    if (findItem) {
      setChoosenUnionData(findItem);
      setSubcategory(slug);
      setSubSubCategory("");

      const findItem2 = data?.find((item) => item.slug === subSubCategory);

      if (findItem2?.rodic != findItem.id) {
        searchParams.delete("predmet");
      }

      const currentPodsekcia = searchParams.get("podsekcia");
      if (currentPodsekcia !== slug) {
        searchParams.set("podsekcia", slug);
      } else {
        searchParams.delete("predmet");
      }
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };
  const handleClickedSubSubCategory = (slug: string) => {
    const findItem = data?.find((item) => item.slug === slug);
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

  const actualizeData = () => {
    try {
      let sekcia = searchParams.get("sekcia");
      let podsekcia = searchParams.get("podsekcia");
      let predmet = searchParams.get("predmet");

      if (sekcia) {
        setCategory(sekcia);
        if (podsekcia) {
          if (predmet) {
            const findItem = data.find((item) => item.slug === predmet);
            setSubcategory(podsekcia);
            if (findItem) {
              setSubSubCategory(findItem?.slug);
              setChoosenUnionData(findItem);
            }
          } else {
            setSubcategory(podsekcia);
            const findItem = data.find((item) => item.slug === podsekcia);
            if (findItem) {
              setSubcategory(findItem?.slug);
              setChoosenUnionData(findItem);
            }
          }
        } else {
          const findItem = data.find((item) => item.slug === sekcia);
          if (findItem) {
            setChoosenUnionData(findItem);
          } else {
            setChoosenUnionData(data[0]);
          }
        }
      } else {
        navigate(`?sekcia=${data[0].slug}`);
        setCategory(data[0].slug);
        setChoosenUnionData(data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      actualizeData();
    }
  }, [data]);

  return (
    <div className="overflow-hidden relative ">
      <div className="own_edge ">
        <div className="main_section !pt-0 ">
          <h2 className="uppercase ">
            Sekcia pre <span className="text-[#6B9156]">zväz</span>
          </h2>
          <div className="flex flex-col lg:flex-row mt-[40px]">
            <div className="max-w-[400px] flex flex-col w-full">
              {data
                .filter((object) => object.rodic === "null")
                .map((object) => (
                  <div className="flex flex-col" key={object.id}>
                    <div
                      className="flex flex-row justify-between items-center pt-[12px] pb-[12px] cursor-pointer"
                      onClick={() => handleClickedCategory(object.slug)}
                    >
                      <h6
                        className={`cursor-pointer uppercase ${
                          object.slug === category && "underline"
                        }`}
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
                              <div
                                className="flex flex-row justify-between items-center cursor-pointer"
                                onClick={() =>
                                  handleClickedSubCategory(object2.slug)
                                }
                              >
                                <h6
                                  className={`cursor-pointer uppercase ${
                                    object2.slug === subCategory && "underline"
                                  }`}
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
                                      className={`flex flex-row justify-between items-center light_green rounded-[8px] pl-[24px] pr-[24px] pt-[16px] pb-[16px] mb-4 mt-4 cursor-pointer ${
                                        subSubCategory === object3.slug &&
                                        "!bg-[#298040]"
                                      } `}
                                      onClick={() =>
                                        handleClickedSubSubCategory(
                                          object3.slug
                                        )
                                      }
                                    >
                                      <p
                                        className={`cursor-pointer uppercase line-clamp-1 ${
                                          subSubCategory === object3.slug &&
                                          "text-white"
                                        } `}
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
                ))}
            </div>
            {choosenUnionData ? (
              <div className="lg:pl-[80px]">
                <h3>{choosenUnionData?.nazov}</h3>
                <div
                  className="content mt-[40px]"
                  dangerouslySetInnerHTML={{ __html: choosenUnionData.text }}
                />
                {choosenUnionData.pdf.length > 0 && (
                  <>
                    <h5 className="mt-[40px] uppercase">
                      Dokumenty na stiahnutie
                    </h5>
                    <div className="flex flex-col gap-4">
                      {" "}
                      {choosenUnionData?.pdf.map((object, index) => (
                        <Link to={object.link} target="_blank" key={index}>
                          <ButtonWithElement
                            text={object.nazov}
                            element={<IconDownload />}
                          />
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
                      {choosenUnionData?.fotky.map(
                        (object, index) =>
                          object != "" && (
                            <img
                              src={object}
                              key={index}
                              className="max-w-[150px] max-h-[150px] rounded-[16px] w-full h-full object-cover cursor-pointer hover:scale-[1.02] duration-200"
                              onClick={() =>
                                handleOpenGallery(choosenUnionData, index)
                              }
                            />
                          )
                      )}
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
      {/* <img
        src={"/icons/icon_union_right.svg"}
        className="absolute h-[578px] w-[373px] -right-40 top-[10%] hidden 3xl:block "
      />
      <img
        src={"/icons/icon_union_left.svg"}
        className="absolute h-[578px] w-[373px] -left-40 top-[10%] hidden 3xl:block"
      /> */}
    </div>
  );
};

export default UnionPageElements;
