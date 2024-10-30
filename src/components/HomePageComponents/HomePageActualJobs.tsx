import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ActualJob } from "../../lib/interface";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePageActualJobs = () => {
  const [data, setData] = useState<ActualJob[]>([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjobsopen`,
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

      setData(responseData.Items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#EDF3DD] own_edge">
      <div className="main_section">
        <h2 className="uppercase">Aktuálne práce v záhrade</h2>
        {data.length != 0 ? (
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            modules={[Navigation, Autoplay]}
            freeMode={true}
            speed={3000}
            className="  mt-[40px] !z-10 relative mb-8"
          >
            {data.map((object, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`flex flex-col p-[24px] rounded-[16px] w-full `}
                  key={index}
                  style={{ background: object.farba }}
                >
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="uppercase text-white">{object.mesiac}</h3>
                    <Link
                      className="btn btn--white"
                      to={object.link}
                      target="_blank"
                    >
                      Pozrieť práce
                    </Link>
                  </div>
                  <p className="text-white">{object.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="hidden md:grid grid-cols-3 gap-[20px]  mt-[40px]  mb-8">
            <Skeleton
              width="100%"
              height={130}
              borderRadius={16}
              baseColor="#7188A1"
            />
            <Skeleton
              width="100%"
              height={130}
              borderRadius={16}
              baseColor="#8BAFBD"
            />
            <Skeleton
              width="100%"
              height={130}
              borderRadius={16}
              baseColor="#A79ABA"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageActualJobs;
