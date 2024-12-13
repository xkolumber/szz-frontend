import { Link } from "react-router-dom";
import { Pdf } from "../lib/interface";

interface Props {
  pdf: Pdf[];
}

const AttachedFiles = ({ pdf }: Props) => {
  return (
    <div className="flex flex-col gap-1 pt-4">
      {pdf
        .sort(
          (a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()
        )
        .map((object, index) => {
          const fileType = object.link.split(".").pop();

          return (
            <div className="flex flex-row items-center" key={index}>
              <Link to={object.link} target="_blank" className="underline">
                {object.nazov}
              </Link>
              <p>,</p>
              <span className="uppercase pl-2"> ({fileType})</span>
            </div>
          );
        })}
    </div>
  );
};

export default AttachedFiles;
