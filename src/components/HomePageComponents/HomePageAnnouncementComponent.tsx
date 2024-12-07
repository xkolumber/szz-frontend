import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Oznamy } from "../../lib/interface";
import IconArrow from "../Icons/IconArrow";

interface Props {
  data: Oznamy[];
}

const HomePageAnnouncementComponent = ({ data }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkAnn = () => {
      data.map((object) => {
        if (object.viditelnost) {
          setIsVisible(true);
        }
      });
    };

    if (data) {
      checkAnn();
    }
  }, [data]);

  return (
    <div
      className={`own_edge relative homepage !pt-2 !pb-2 bg-[#d16683] ${
        !isVisible && "!hidden"
      }`}
    >
      <div className="main_section  !pt-0 !pb-0 justify-center flex flex-col">
        {" "}
        {data.map(
          (object, index) =>
            object.viditelnost && (
              <Link
                className="flex flex-row gap-4 items-center"
                key={index}
                to={`/oznamy/${object.slug}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p className="text-white"> {object.datum}</p>
                <p className="text-white">|</p>
                <p className="text-white">{object.nazov}</p>
                <IconArrow ishovered={hoveredIndex === index} color="#ffffff" />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default HomePageAnnouncementComponent;
