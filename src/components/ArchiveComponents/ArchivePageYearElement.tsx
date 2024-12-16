import { Link } from "react-router-dom";
import { Archive } from "../../lib/interface";
import { useEffect, useState } from "react";
import { useNavbar } from "../Provider";
import Modal from "../Modal";
import PDFViewer from "../PdfViewer";

interface Props {
  data: Archive[];
}

const ArchivePageYearElement = ({ data }: Props) => {
  const [hashValue, setHashValue] = useState<string | null>("");
  const { setNavbarZIndex } = useNavbar();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocumentLink, setSelectedDocumentLink] = useState<
    string | null
  >(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = decodeURIComponent(window.location.hash.substring(1));
      setHashValue(hash);

      if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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
    <div className="flex flex-col gap-4">
      {data?.map((object, index) =>
        object.typ === "pdf" ? (
          <span className="flex flex-row items-center pt-4" key={index}>
            <div
              className={`flex flex-row items-center gap-1 max-w-full overflow-hidden cursor-pointer`}
              id={object.id}
              onClick={() => handleOpen(object.pdf_link)}
            >
              <p
                className={`underline whitespace-nowrap overflow-hidden text-ellipsis inline ${
                  hashValue === object.id && "highlight"
                } `}
              >
                {object.pdf_nazov}
              </p>
              <p className="uppercase whitespace-nowrap overflow-hidden text-ellipsis inline">
                , ({object.typ})
              </p>
            </div>
          </span>
        ) : (
          <span className="flex flex-row items-center pt-4" key={index}>
            <Link
              to={object.pdf_link}
              className={`flex flex-row items-center gap-1 max-w-full overflow-hidden `}
              id={object.id}
            >
              <p
                className={`underline whitespace-nowrap overflow-hidden text-ellipsis inline ${
                  hashValue === object.id && "highlight"
                } `}
              >
                {object.pdf_nazov}
              </p>
              <p className="uppercase whitespace-nowrap overflow-hidden text-ellipsis inline">
                , ({object.typ})
              </p>
            </Link>
          </span>
        )
      )}

      <Modal isOpen={isOpen} onClose={handleClose}>
        <PDFViewer pdfUrl={selectedDocumentLink} />
      </Modal>
    </div>
  );
};

export default ArchivePageYearElement;
