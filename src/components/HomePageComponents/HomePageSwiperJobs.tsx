import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ActualJob } from "../../lib/interface";
import IconSwiperArrowLeft from "../Icons/IconSwiperArrowLeft";
import IconSwiperArrowRight from "../Icons/IconSwiperArrowRight";

interface Props {
  data: ActualJob[];
  clickedLink: (link: string | null) => void;
}

const HomePageSwiperJobs = ({ data, clickedLink }: Props) => {
  const showDocument = (link_: string) => {
    clickedLink(link_);
  };

  return (
    <div>
      {data && (
        <div className="relative">
          <div className=" flex-row gap-8 justify-end -mt-28 hidden md:flex mb-24">
            <div className="arrow-right w-16 h-16 3xl:w-20 3xl:h-20 scale-90 2xl:scale-100 cursor-pointer">
              <IconSwiperArrowLeft />
            </div>
            <div className="arrow-left w-16 h-16 3xl:w-20 3xl:h-20 scale-90 2xl:scale-100 cursor-pointer">
              <IconSwiperArrowRight />
            </div>
          </div>
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
            freeMode={true}
            modules={[Navigation]}
            navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
            speed={1000}
            className="mt-8 md:mt-[40px] !z-10 relative mb-8"
          >
            {data.map((object) => (
              <SwiperSlide key={object.id}>
                <div
                  className={`flex flex-col p-[24px] rounded-[16px] w-full`}
                  style={{ background: object.farba }}
                >
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="uppercase text-white">{object.mesiac}</h3>
                    <button
                      className="btn btn--white"
                      onClick={() => showDocument(object.pdf.link)}
                      style={{ color: object.farba }}
                    >
                      Pozrieť práce
                    </button>
                  </div>
                  <p className="uppercase pt-4 text-white font-bold">
                    Pranostika
                  </p>
                  <p className="text-white line-clamp-2 opacity-80">
                    {object.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-row justify-between md:hidden pt-12">
            <div className="arrow-right   cursor-pointer">
              <IconSwiperArrowLeft />
            </div>
            <div className="relative w-full justify-center mt-40">
              <img
                src={"/krtko.svg"}
                className={`absolute h-[135px]  w-[221px] right-[22px] bottom-0 z-20 ease-in duration-100`}
              />
              <img
                src={"/zem.svg"}
                className="absolute h-[95px] w-[191px] right-[28px] -bottom-12  z-20"
              />
            </div>

            <div className="arrow-left   cursor-pointer ">
              <IconSwiperArrowRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageSwiperJobs;
