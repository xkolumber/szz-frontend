import { Link } from "react-router-dom";
import { years } from "../../lib/functionsClient";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import { Helmet } from "react-helmet-async";

const ArchivePage = () => {
  const actual_year = new Date().getFullYear();
  return (
    <div className="own_edge min-h-[600px]">
      <Helmet>
        <title>Archív dokumentov</title>
        <meta
          name="description"
          content="Archív dokumentov za posledných 10 rokov."
        />
        <meta
          name="keywords"
          content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
        />
        <meta name="author" content="Slovenský zväz záhradkárov" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.zvazzahradkarov.sk/archiv" />
        <meta property="og:title" content="Archív dokumentov" />
        <meta
          property="og:description"
          content="Archív dokumentov za posledných 10 rokov."
        />
        <meta
          property="og:url"
          content="https://www.zvazzahradkarov.sk/archiv"
        />
        <meta property="og:type" content="website" />
      </Helmet>
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
