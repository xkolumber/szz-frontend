import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tlacivo } from "../../lib/interface";

interface Props {
  data: Tlacivo[];
}

const DocumentsPageComponent = ({ data }: Props) => {
  const hash = decodeURIComponent(window.location.hash.substring(1));
  const [hashExist, setHashExist] = useState(false);

  useEffect(() => {
    if (hash) {
      setHashExist(true);
      const targetElement = document.getElementById(hash.slice(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
          <div className="flex flex-row items-center pt-4" key={index}>
            <Link
              to={object.link}
              target="_blank"
              key={index}
              className={`underline ${
                normalizedNazov.includes(normalizedHash) &&
                hashExist &&
                "highlight"
              }`}
              id={object.nazov}
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
