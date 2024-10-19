import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL_BASIC, Gallery } from "../../lib/interface";

const GalleryPageId = () => {
  const [data, setData] = useState<Gallery>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL_BASIC}/getallgaleries/${id}`, {
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

    if (id) {
      getData();
    }
  }, [id]);

  return (
    <div className="own_edge">
      <div className="main_section ">
        {data ? (
          <>
            <div className="flex items-center flex-col">
              <h1>{data?.nazov}</h1>
              <p className="opacity-60">{data.datum}</p>
              <div className="grid grid-cols-4 gap-24 mt-8">
                {data.fotky.map((object, index) => (
                  <img
                    src={object}
                    key={index}
                    className="rounded-[16px] w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-screen">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPageId;
