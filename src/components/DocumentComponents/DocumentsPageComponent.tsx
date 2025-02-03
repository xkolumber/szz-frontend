import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tlacivo } from "../../lib/interface";
import { replaceS3UrlsWithCloudFront } from "../../lib/functionsClient";

interface Props {
  data: Tlacivo[];
}

const DocumentsPageComponent = ({ data }: Props) => {
  const hash = decodeURIComponent(window.location.hash.substring(1));
  const [hashExist, setHashExist] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (hash) {
        setHashExist(true);
        const targetElement = document.getElementById(hash.slice(1));
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

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <div className="flex flex-col gap-4">
      {data?.map((object, index) => {
        const normalizedNazov = normalizeText(object.nazov);
        const normalizedHash = normalizeText(hash);

        return (
          <div className="flex flex-wrap items-center pt-4" key={index}>
            <Link
              to={replaceS3UrlsWithCloudFront(object.link, "archivedocs")}
              target="_blank"
              key={index}
              className={`underline ${
                normalizedNazov.includes(normalizedHash) &&
                hashExist &&
                "highlight"
              }`}
              id={object.nazov}
              rel="noopener noreferrer"
            >
              {object.nazov}
            </Link>
            <p className="uppercase">, ({object.typ})</p>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentsPageComponent;
