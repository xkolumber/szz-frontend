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
          <Skeleton
            width={180}
            height={30}
            borderRadius={8}
            baseColor="#ffffff"
          />
          <Skeleton
            width={230}
            height={30}
            borderRadius={8}
            baseColor="#ffffff"
          />
          <Skeleton
            width={120}
            height={30}
            borderRadius={8}
            baseColor="#ffffff"
          />
          <Skeleton
            width={140}
            height={30}
            borderRadius={8}
            baseColor="#ffffff"
          />
          <Skeleton
            width={190}
            height={30}
            borderRadius={8}
            baseColor="#ffffff"
          />
          <Skeleton
            width={150}
            height={30}
            borderRadius={8}
            baseColor="#ffffff"
          />
          <Skeleton
            width={180}
            height={30}
            borderRadius={8}
            baseColor="#ffffff"
          />
        </div>
      </div>
    );
  }

  if (status === "error") return <p>Error: {error.message}</p>;

  const sortedData: NavbarInfoData[] = data.sort(
    (a: any, b: any) => a.poradie - b.poradie
  );

  return (
    <div className="flex flex-row gap-6 main_section !pt-0 !pb-0 ">
      <div className="flex flex-wrap gap-4  scroll-container">
        {sortedData.map((object, index) => (
          <Link
            className="btn btn--navbar"
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
