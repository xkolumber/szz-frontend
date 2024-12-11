"use client";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getActualJobs } from "../../lib/functions";
import { ActualJob } from "../../lib/interface";
import HomePageSwiperJobs from "./HomePageSwiperJobs";

import { useEffect, useState } from "react";
import Modal from "../Modal";
import PDFViewer from "../PdfViewer";
import { useNavbar } from "../Provider";

const HomePageActualJobs = () => {
  const [isHovered, setIsHovered] = useState(false);
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

  if (isLoading) {
    return (
      <>
        <div className="relative own_edge  overflow-hidden">
          <div className="main_section  z-10">
            <h2 className="uppercase text-center md:text-left">
              Aktuálne práce v záhrade
            </h2>
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
            <div className="grid md:hidden grid-cols-1 gap-[20px]  mt-[40px]  mb-8">
              <Skeleton
                width="100%"
                height={150}
                borderRadius={16}
                baseColor="#7188A1"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative own_edge  overflow-hidden">
        <div className="main_section  z-10">
          <h2 className="uppercase text-center md:text-left">
            Aktuálne práce v záhrade
          </h2>
          {data && (
            <HomePageSwiperJobs data={data} clickedLink={handleClickedLink} />
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <PDFViewer pdfUrl={selectedDocumentLink} />
      </Modal>

      <img
        src={"/krtko.svg"}
        className={`absolute ${
          isHovered ? "h-[120px]" : "h-[135px]"
        }  w-[221px] right-[42px] bottom-12 hidden xl:block z-20 ease-in duration-100`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <img
        src={"/zem.svg"}
        className="absolute h-[95px] w-[191px] right-20 -bottom-0 hidden xl:block z-20"
      />

      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default HomePageActualJobs;
