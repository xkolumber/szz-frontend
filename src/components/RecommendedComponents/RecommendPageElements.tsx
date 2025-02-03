import { Link } from "react-router-dom";
import { Sponsor } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import SeoElement from "../SeoElement";
import { replaceS3UrlsWithCloudFront } from "../../lib/functionsClient";

interface Props {
  data: Sponsor[];
}

const RecommendPageElements = ({ data }: Props) => {
  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <SeoElement
        slug="Záhradkári spolupracujú"
        title="Záhradkári spolupracujú"
        description="Zoznam našich partnerov"
      />

      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="text-center mt-8">Záhradkári spolupracujú</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.map((object, index) => (
            <Link
              className=""
              key={index}
              to={object.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width={200}
                height={120}
                src={replaceS3UrlsWithCloudFront(object.logo, "imagesalll")}
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
