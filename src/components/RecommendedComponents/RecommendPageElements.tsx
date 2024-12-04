import { Link } from "react-router-dom";
import { Sponsor } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

interface Props {
  data: Sponsor[];
}

const RecommendPageElements = ({ data }: Props) => {
  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
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