import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL_BASIC, Blog } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

const BlogsPage = () => {
  const [data, setData] = useState<Blog[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL_BASIC}/getallblogs`, {
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
    <div className="own_edge min-h-screen">
      <div className="main_section">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/blog`} />
        <h2 className="uppercase text-center">Záhradkársky blog</h2>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {data.map((object, index) => (
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

export default BlogsPage;
