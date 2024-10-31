import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { NavbarInfoData } from "../lib/interface";
import { fetchNavbarData } from "../lib/functions";

const NavbarInfo = () => {
  const { data, status, error, isLoading } = useQuery({
    queryKey: ["navbar_info"],
    queryFn: fetchNavbarData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return (
      <div className="flex flex-row gap-6 main_section !pt-0 !pb-0 justify-between">
        <div className="hidden md:flex flex-row gap-[32px]">
          <Skeleton width={80} height={20} borderRadius={8} />
          <Skeleton width={120} height={20} borderRadius={8} />
          <Skeleton width={80} height={20} borderRadius={8} />
        </div>
        <div className="flex-row gap-[32px] hidden md:flex">
          <Skeleton width={80} height={20} borderRadius={8} />
          <Skeleton width={80} height={20} borderRadius={8} />
        </div>
      </div>
    );
  }

  if (status === "error") return <p>Error: {error.message}</p>;

  const sortedData = data.sort((a: any, b: any) => a.poradie - b.poradie);
  const displayedData: NavbarInfoData[] = sortedData.slice(
    0,
    sortedData.length - 2
  );
  const additionalData: NavbarInfoData[] = sortedData.slice(-2);

  return (
    <div className="flex flex-row gap-6 main_section !pt-0 !pb-0 justify-between">
      <div className="flex flex-row gap-[32px]">
        {displayedData.map((object, index) => (
          <Link
            className="text-white"
            key={index}
            to={object.link}
            target={object.typ === "link" ? "_self" : "_blank"}
          >
            {object.nazov}
          </Link>
        ))}
      </div>

      <div className="flex-row gap-[32px] hidden md:flex">
        {additionalData.map((object, index) => (
          <Link
            className="text-white"
            key={index}
            to={object.link}
            target={object.typ === "link" ? "_self" : "_blank"}
          >
            {object.nazov}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarInfo;
