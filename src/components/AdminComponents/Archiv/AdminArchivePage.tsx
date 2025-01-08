import { Link } from "react-router-dom";
import { years } from "../../../lib/functionsClient";
import StepBack from "../../StepBack";

const AdminArchivePage = () => {
  const actual_year = new Date().getFullYear();

  return (
    <div>
      <div className=" w-full">
        <StepBack />
        <h2>Archív</h2>
        <Link to={`/admin/archiv/novy-dokument`}>
          <p className="underline">Pridať nový dokument</p>
        </Link>

        <div className="flex flex-col gap-8 pt-16">
          <Link to={`/admin/archiv/pred-2019`} className="underline">
            Pred 2019
          </Link>
          {years.map(
            (object, index) =>
              object <= actual_year && (
                <Link
                  to={`/admin/archiv/${object}`}
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

export default AdminArchivePage;
