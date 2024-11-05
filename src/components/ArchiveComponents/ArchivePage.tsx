import { Link } from "react-router-dom";
import { years } from "../../lib/functionsClient";

const ArchivePage = () => {
  const actual_year = new Date().getFullYear();
  return (
    <div className="own_edge min-h-screen">
      <div className="main_section !pt-0">
        <h2>Archív</h2>

        <div className="flex flex-col gap-8">
          {years.map(
            (object, index) =>
              object <= actual_year && (
                <Link
                  to={`/archiv/${object}`}
                  className="underline"
                  key={index}
                >
                  {object}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
