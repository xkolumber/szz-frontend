import { Link } from "react-router-dom";
import { years } from "../../lib/functionsClient";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

const ArchivePage = () => {
  const actual_year = new Date().getFullYear();
  return (
    <div className="own_edge min-h-[600px]">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="uppercase text-center mt-8">Archív</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] pt-8">
          <Link
            to={`/archiv/pred-2019`}
            className="bg_green_opacity rounded-[16px] text-bold uppercase p-[24px]"
          >
            Archív pred 2019
          </Link>
          {years.map(
            (object, index) =>
              object <= actual_year && (
                <Link
                  to={`/archiv/${object}`}
                  className="bg_green_opacity rounded-[16px] text-bold uppercase p-[24px]"
                  key={index}
                >
                  Archív {object}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
