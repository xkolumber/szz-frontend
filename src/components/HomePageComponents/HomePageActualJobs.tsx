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

const HomePageActualJobs = () => {
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
    setIsOpen(false);
    setSelectedDocumentLink(null);
  };

  const handleClickedLink = (link: string | null) => {
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
      {" "}
      <div className="relative h-auto">
        {" "}
        <img
          src="/bgbroown.svg"
          alt="Background"
          className="absolute inset-0 w-full h-[400px] md:h-[579px] object-cover -z-10"
        />
        <div className="relative own_edge">
          <div className="main_section z-10">
            <h2 className="uppercase">Aktuálne práce v záhrade</h2>
            {data && (
              <HomePageSwiperJobs data={data} clickedLink={handleClickedLink} />
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <PDFViewer pdfUrl={selectedDocumentLink} />
      </Modal>
      {isLoading && (
        <>
          <div className="bg-[#EDF3DD] own_edge">
            <div className="main_section">
              <h2 className="uppercase">Aktuálne práce v záhrade</h2>
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
            </div>
          </div>
        </>
      )}
      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default HomePageActualJobs;
