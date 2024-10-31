import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getActualJobs } from "../../lib/functions";
import { ActualJob } from "../../lib/interface";
import HomePageSwiperJobs from "./HomePageSwiperJobs";

const HomePageActualJobs = () => {
  const { data, status, error, isLoading } = useQuery<ActualJob[]>({
    queryKey: ["actual_jobs"],
    queryFn: getActualJobs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="bg-[#EDF3DD] own_edge">
        <div className="main_section">
          <h2 className="uppercase">Aktuálne práce v záhrade</h2>
          <div className="hidden md:grid grid-cols-3 gap-[20px]  mt-[40px]  mb-8">
            <Skeleton
              width="100%"
              height={130}
              borderRadius={16}
              baseColor="#7188A1"
            />
            <Skeleton
              width="100%"
              height={130}
              borderRadius={16}
              baseColor="#8BAFBD"
            />
            <Skeleton
              width="100%"
              height={130}
              borderRadius={16}
              baseColor="#A79ABA"
            />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="bg-[#EDF3DD] own_edge">
      <div className="main_section">
        <h2 className="uppercase">Aktuálne práce v záhrade</h2>
        {data && <HomePageSwiperJobs data={data} />}
      </div>
    </div>
  );
};

export default HomePageActualJobs;
