import { Link } from "react-router-dom";
import { Sponsor } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import { Helmet } from "react-helmet-async";

interface Props {
  data: Sponsor[];
}

const RecommendPageElements = ({ data }: Props) => {
  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Odporúčame</title>
        <meta name="description" content="Zoznam našich partnerov" />
        <meta
          name="keywords"
          content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
        />
        <meta name="author" content="Slovenský zväz záhradkárov" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href="https://www.zvazzahradkarov.sk/odporucame"
        />
        <meta property="og:title" content="Zoznam našich partnerov" />
        <meta property="og:description" content="Zoznam našich partnerov" />
        <meta
          property="og:url"
          content="https://www.zvazzahradkarov.sk/odporucame"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="text-center mt-8">Odporúčame</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.map((object, index) => (
            <Link className="" key={index} to={object.link} target="_blank">
              <img
                width={200}
                height={120}
                src={object.logo}
                className="mt-4 mb-4 cursor-pointer object-cover w-full h-full rounded-[16px]"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendPageElements;
