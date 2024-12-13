import { Link } from "react-router-dom";
import { Archive } from "../../lib/interface";
import { useEffect, useState } from "react";

interface Props {
  data: Archive[];
}

const ArchivePageYearElement = ({ data }: Props) => {
  const [hashValue, setHashValue] = useState<string | null>("");

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

  return (
    <div className="flex flex-col gap-4">
      {data?.map((object, index) => (
        <span className="flex flex-row items-center pt-4" key={index}>
          <Link
            to={object.pdf_link}
            target="_blank"
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
      ))}
    </div>
  );
};

export default ArchivePageYearElement;
