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

  return (
    <div className="flex flex-col gap-4">
      {data?.map((object, index) => (
        <div className="flex flex-row items-center pt-4" key={index}>
          <Link
            to={object.link}
            target="_blank"
            key={index}
            className={`underline ${
              object.nazov.toLowerCase().includes(hash.toLowerCase()) &&
              hashExist &&
              "highlight"
            }`}
            id={object.nazov}
          >
            {" "}
            {object.nazov}
          </Link>
          <p className="uppercase">, ({object.typ})</p>
        </div>
      ))}
    </div>
  );
};

export default DocumentsPageComponent;
