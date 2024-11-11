import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ActualJob } from "../../lib/interface";
import Modal from "../Modal";
import PDFViewer from "../PdfViewer";

interface Props {
  data: ActualJob[];
}

const HomePageSwiperJobs = ({ data }: Props) => {
  const [documentLink, setDocumentLink] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showDocument = (link_: string) => {
    setDocumentLink(link_);
    setIsOpen(true);
    setDocumentLink(link_);
  };

  const handleClose = () => {
    setIsOpen(false);
    setDocumentLink(null);
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
    <div>
      {data && (
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
          className="mt-[40px] !z-10 relative mb-8"
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
                    className="btn btn--navbar"
                    onClick={() => showDocument(object.pdf.link)}
                    style={{ color: object.farba }}
                  >
                    Pozrieť práce
                  </button>
                </div>
                <p className="text-white">{object.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Modal isOpen={isOpen} onClose={handleClose}>
        <PDFViewer pdfUrl={documentLink} />
      </Modal>
    </div>
  );
};

export default HomePageSwiperJobs;
