import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL_BASIC, Blog } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";

const HomePageBlogSection = () => {
  const [data, setData] = useState<Blog[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL_BASIC}/blogshomepage`, {
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

        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="own_edge bg-[#FFEEDC]">
      <div className="main_section">
        <div className="flex flex-row justify-between  items-center mb-[32px]">
          <h2 className="uppercase">Blog</h2>
          <ButtonWithArrow title="Zobraziť celý blog" link={`/blog`} />
        </div>
        {data && data.length > 0 ? (
          <div className="">
            <div className="flex md:flex-row gap-[24px]">
              <Link
                className={`md:w-1/2 flex flex-col  rounded-[24px]   w-full hover:scale-[1.01] duration-200 `}
                to={`/blog/${data[0].slug}`}
              >
                {" "}
                <img src={data[0].titulna_foto} className="rounded-[16px]" />
                <h5 className="uppercase mt-[24px]">{data[0].nazov_blog}</h5>
                <p className="opacity-80 ">{data[0].popis1}</p>
              </Link>
              <div className="hidden lg:flex flex-col md:w-1/2 gap-[24px]">
                {data &&
                  data.length > 1 &&
                  data.map(
                    (object, index) =>
                      index > 0 && (
                        <Link
                          className={`flex flex-row  rounded-[24px]   w-full hover:scale-[1.01] duration-200 `}
                          key={index}
                          to={`/blog/${object.slug}`}
                        >
                          {" "}
                          <img
                            src={object.titulna_foto}
                            className="rounded-[16px] max-w-[342px]"
                          />
                          <div className="flex flex-col pl-[24px]">
                            {" "}
                            <h6 className="pt-[8px] uppercase">
                              {object.nazov_blog}
                            </h6>
                            <p className="line-clamp-4 opacity-80 pt-[8px]">
                              {object.popis1}
                            </p>
                          </div>
                        </Link>
                      )
                  )}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HomePageBlogSection;
