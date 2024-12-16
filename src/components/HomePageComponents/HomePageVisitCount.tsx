import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getCount, updateCount } from "../../lib/functions";
import { useQuery } from "@tanstack/react-query";
import { Navstevnost } from "../../lib/interface";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState<string | null>(null);

  const session_value = sessionStorage.getItem("visit");

  const { data, isLoading, isError } = useQuery<Navstevnost>({
    queryKey: ["visit-count"],
    queryFn: getCount,
    enabled: session_value === null,
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: updatedData,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery<Navstevnost>({
    queryKey: ["visit-count-update"],
    queryFn: updateCount,
    enabled: session_value === "x",
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("visit", "x");
      setVisitCount(data.navstevnost?.toString() ?? "0");
    }
  }, [data]);

  if (isLoading || isLoading2)
    return (
      <div className="flex flex-row items-center gap-4">
        <p>Počet návštev:</p>{" "}
        <ClipLoader size={20} color={"#000000"} loading={true} />{" "}
      </div>
    );
  if (isError || isError2) return <p>Error fetching visit count</p>;

  console.log("first");

  return (
    <div>
      {session_value === "x" ? (
        <p>
          Počet návštev:{" "}
          {updatedData?.navstevnost
            ? new Intl.NumberFormat().format(updatedData.navstevnost)
            : "..."}
        </p>
      ) : (
        <p>
          Počet návštev:{" "}
          {visitCount
            ? new Intl.NumberFormat().format(Number(visitCount))
            : "..."}
        </p>
      )}
    </div>
  );
};

export default VisitCounter;
