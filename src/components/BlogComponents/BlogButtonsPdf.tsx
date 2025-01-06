import { Link } from "react-router-dom";
import { Pdf } from "../../lib/interface";
import { useNavbar } from "../Provider";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import PDFViewer from "../PdfViewer";
import { replaceS3UrlsWithCloudFront } from "../../lib/functionsClient";

interface Props {
  pdf: Pdf[];
}

const BlogButtonsPdf = ({ pdf }: Props) => {
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
      <div className="flex flex-wrap gap-4">
        {pdf.map((object, index) => {
          const fileType = object.link.split(".").pop();
          return fileType === "pdf" ? (
            <div
              className="btn btn--tertiary !normal-case"
              key={index}
              onClick={() =>
                handleOpen(replaceS3UrlsWithCloudFront(object.link, "pdf"))
              }
            >
              {object.nazov}.{fileType}
            </div>
          ) : (
            <Link
              to={replaceS3UrlsWithCloudFront(object.link, "pdf")}
              className="btn btn--tertiary !normal-case"
              key={index}
            >
              {object.nazov}.{fileType}
            </Link>
          );
        })}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <PDFViewer pdfUrl={selectedDocumentLink} />
      </Modal>
    </>
  );
};

export default BlogButtonsPdf;
