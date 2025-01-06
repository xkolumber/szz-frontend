import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pdf } from "../lib/interface";
import Modal from "./Modal";
import PDFViewer from "./PdfViewer";
import { useNavbar } from "./Provider";
import { replaceS3UrlsWithCloudFront } from "../lib/functionsClient";

interface Props {
  pdf: Pdf[];
}

const AttachedFiles = ({ pdf }: Props) => {
  const { setNavbarZIndex } = useNavbar();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocumentLink, setSelectedDocumentLink] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = (link_: string) => {
    setNavbarZIndex(100);
    setIsOpen(true);
    setSelectedDocumentLink(link_);
  };

  const handleClose = () => {
    setIsOpen(false);
    setNavbarZIndex(400);
    setSelectedDocumentLink(null);
  };

  return (
    <>
      <div className="flex flex-col gap-1 pt-4">
        {pdf
          .sort(
            (a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()
          )
          .map((object, index) => {
            const fileType = object.link.split(".").pop();

            return fileType === "pdf" ? (
              <div className="flex flex-row items-center" key={index}>
                <p
                  className="underline cursor-pointer"
                  onClick={() =>
                    handleOpen(
                      replaceS3UrlsWithCloudFront(object.link, "archivedocs")
                    )
                  }
                >
                  {object.nazov}
                </p>
                <p>,</p>
                <span className="uppercase pl-2"> ({fileType})</span>
              </div>
            ) : (
              <div className="flex flex-row items-center" key={index}>
                <Link
                  to={replaceS3UrlsWithCloudFront(object.link, "archivedocs")}
                  className="underline"
                >
                  {object.nazov}
                </Link>
                <p>,</p>
                <span className="uppercase pl-2"> ({fileType})</span>
              </div>
            );
          })}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <PDFViewer pdfUrl={selectedDocumentLink} />
      </Modal>
    </>
  );
};

export default AttachedFiles;
