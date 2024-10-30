import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Blog } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

const BlogDetailPage = () => {
  const [data, setData] = useState<Blog>();
  const [data2, setData2] = useState<Blog[]>([]);
  const { slug } = useParams<{ slug: string }>();

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api//getblog/${slug}`,
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
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData2 = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/getblogsexcept/${slug}`,
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
      <div className="main_section !pt-0 ">
        <ButtonWithArrowLeft title="Späť na blog" link={`/blog`} />
        {data ? (
          <>
            <div className="flex items-center flex-col">
              <h1>{data?.nazov_blog}</h1>
              <div className="flex flex-row gap-6  ">
                <p className="font-medium">{data.datum}</p>
              </div>

              <img
                src={data.titulna_foto}
                width={900}
                height={900}
                className="rounded-[16px] max-w-[1080px] max-h-[459px] object-cover mt-8"
              />
            </div>

            <div className="max-w-[900px] m-auto mt-[80px]">
              {data.popis1 && <p>{data.popis1}</p>}

              {data.foto1 && (
                <img
                  src={data.foto1}
                  width={900}
                  height={900}
                  className="rounded-[16px] max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}
              {data.popis2 && <p className="mt-40">{data.popis2}</p>}

              {data.foto2 && (
                <img
                  src={data.foto2}
                  width={900}
                  height={900}
                  className="rounded-[16px] max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}
              {data.popis3 && <p className="mt-40">{data.popis3}</p>}

              {data.foto2 && (
                <img
                  src={data.foto3}
                  width={900}
                  height={900}
                  className="rounded-[16px] max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}

              {data.pdf.length > 0 && (
                <>
                  <h5 className="mt-[40px] uppercase">
                    Dokumenty na stiahnutie
                  </h5>
                  <div className="flex flex-row gap-4">
                    {" "}
                    {data?.pdf.map((object, index) => (
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
              <div className="flex flex-row justify-between opacity-60 mt-16">
                <p className="uppercase font-semibold ">
                  Publikované {data.datum}
                </p>
                <p className="uppercase font-semibold">Späť na začiatok </p>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-screen">
            <p>Loading...</p>
          </div>
        )}
        <div className="flex flex-row justify-between mt-[80px] items-center mb-[32px]">
          <h2 className="uppercase ">Ďalšie články</h2>
          <ButtonWithArrow title="Zobraziť všetky" link={`/blog`} />
        </div>
        {data2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {data2.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] w-full  hover:scale-[1.02] duration-200`}
                key={index}
                to={`/blog/${object.slug}`}
              >
                <img src={object.titulna_foto} className="rounded-[16px]" />

                <h5 className="pt-[8px]">{object.nazov_blog}</h5>
                <p className="opacity-80 line-clamp-4">{object.popis1}</p>
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

export default BlogDetailPage;
