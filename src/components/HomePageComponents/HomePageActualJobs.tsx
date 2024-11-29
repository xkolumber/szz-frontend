"use client";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getActualJobs } from "../../lib/functions";
import { ActualJob } from "../../lib/interface";
import HomePageSwiperJobs from "./HomePageSwiperJobs";

import Modal from "../Modal";
import PDFViewer from "../PdfViewer";
import { useEffect, useState } from "react";
import IconBgBroownTop from "../Icons/IconBgBroownTop";
import IconBgBroownBottom from "../Icons/IconBgBroownBottom";
import { useNavbar } from "../Provider";

const HomePageActualJobs = () => {
  const { setNavbarZIndex } = useNavbar();
  const [selectedDocumentLink, setSelectedDocumentLink] = useState<
    string | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isLoading } = useQuery<ActualJob[]>({
    queryKey: ["actual_jobs"],
    queryFn: getActualJobs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleClose = () => {
    setNavbarZIndex(400);
    setIsOpen(false);
    setSelectedDocumentLink(null);
  };

  const handleClickedLink = (link: string | null) => {
    setNavbarZIndex(100);
    setSelectedDocumentLink(link);
    setIsOpen(true);
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
    <>
      <IconBgBroownTop />
      <div className="relative own_edge bg-[#FFF2EC] overflow-hidden">
        <div className="main_section !pt-0 !pb-0 z-10">
          <h2 className="uppercase text-center md:text-left">
            Aktuálne práce v záhrade
          </h2>
          {data && (
            <HomePageSwiperJobs data={data} clickedLink={handleClickedLink} />
          )}
          {isLoading && (
            <div className="hidden md:grid grid-cols-3 gap-[20px]  mt-[40px]  mb-8">
              <Skeleton
                width="100%"
                height={150}
                borderRadius={16}
                baseColor="#7188A1"
              />
              <Skeleton
                width="100%"
                height={150}
                borderRadius={16}
                baseColor="#8BAFBD"
              />
              <Skeleton
                width="100%"
                height={150}
                borderRadius={16}
                baseColor="#A79ABA"
              />
            </div>
          )}
        </div>
      </div>
      <IconBgBroownBottom />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <PDFViewer pdfUrl={selectedDocumentLink} />
      </Modal>
      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default HomePageActualJobs;
