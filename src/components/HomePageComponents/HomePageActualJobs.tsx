import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ActualJob } from "../../lib/interface";
import Modal from "../Modal";
import PDFViewer from "../PdfViewer";

const HomePageActualJobs = () => {
  const [documentLink, setDocumentLink] = useState<string | null>(null);
  const [data, setData] = useState<ActualJob[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

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

  const showDocument = (link_: string) => {
    setIsOpen(true);
    setDocumentLink(
      "https://pdffilesown.s3.eu-north-1.amazonaws.com/test.pdf?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LW5vcnRoLTEiRjBEAiBrAso3P3HITVgW3Mn5B6gLPD98bjiOgnWjO1wyNMgxvwIgYC54VDIqUgPsLfuMK9y6CxxkG1ujl8o3fL0r2A01LPMqywMIdBAAGgw4NjQ4OTk4NDMyNjIiDMXo6zOaDlBBWZDL6CqoA7kItGp1NT9bSLYEJRD26ml2yFpAXFFnDqH5XkyqqZOIWsw%2Fz6wmAUUVlitta%2FsV3NZIy%2FeWwzQgGxFMQyhdfSstJFjQTyGnKC6fxIp46t%2BQEdk15trRLYWixnGWbO6GpHNvmr6nZKE5LuLxNfo30sSj%2FozHQ8gKCf8gtIVw6%2F%2FduBbUHOxGEaWfHK36v9fyCut9bN1bFR1kNzG8Kp4mZK5PWTEP7t76QCDtPRe9DZNMGGShuAY6oTLH6pFmY8PowQjfzk0kf9kkmUBTRFrJd5fxdPFxo852b2hxecpteqT2dgXLg232SzFXgWVOYvpXwT%2BeZqD2KDPftLHw9SRy8nIN7Qc2feUyeugQ0h2dak0hJIOXsxPf%2FFu%2BPyB%2Bd6nxu2IWyveGjKr8z6RLO05H%2B1hC7VFx8eqslGBBdIZAFr5IOvfaBRMpYHxQIto%2Bkd%2B7kLaMndGBw0o9V3LmeCwrpqe5TfEVFXLcGNhBpO41Shp8RI3v%2BpeUFN8z0TPalpsXxsTX8tWrOK18u0rzK%2BUz%2FCqRklt6JtIJqy2EBLu0bOSb8hBJg%2FJ88Tkw1sWHuQY65QJo4V8qvQlJtCk7iA7LpfID4R13SX5kVqntPFxnTaVOwkTyjK1el5p7QeUAS9rTOZnOrPk1q6uG7ayHbKCBSC0egUqDb6bQuQrOIlDrrRVz%2Bc70TFK4CVdpeMcbVJJFsbJV0bVQJmTuGxYvHNAkVyYpYunvUjfonaMxNPotBpG4HOgQqTcGEjMUtIiXg6vjDFP5aW%2BFeW67ask8WVQUaPbld7iJ1aol9x0mE5JSzSzdNz4rxNXPVSd8D%2BUvDwz1STQIiRviEBo9TZwNJ2KV8Z2%2BDPGbbGTOSMwwpv4oAIsSaBnuz4xgHDXXJpuLXqhbji7koP%2FzD6c%2BDymmulpdgcpa0L87jnx7sAArwHtOFmMV%2F9TfbPwNFm5fOAtPx%2FAtvuV2%2Br0TmffcfbJ4scaEXUZOAmgLwE%2FQv9r%2FjaRIB6%2F2HDBHtExgaqt0BRbLDp94EJLWBYsZpM3GssflO8lDdB%2BIh0LvC1Y%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4SYAMIS7ORO7VYLV%2F20241030%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20241030T111509Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6ddf81e09bad903a908a408a3612962134027fc92c0b8cf01667d2004106d5f3"
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [isOpen]);

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
                    <button
                      className="btn btn--white"
                      onClick={() => showDocument(object.link)}
                    >
                      Pozrieť práce
                    </button>
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
        <Modal isOpen={isOpen} onClose={handleClose}>
          <PDFViewer pdfUrl={documentLink} />
        </Modal>
        {/* {documentLink && } */}
      </div>
    </div>
  );
};

export default HomePageActualJobs;
