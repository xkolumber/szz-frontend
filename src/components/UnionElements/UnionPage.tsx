import { useQuery } from "@tanstack/react-query";
import "yet-another-react-lightbox/styles.css";
import { fetchUnionDataClient } from "../../lib/functions";
import { UnionData } from "../../lib/interface";
import UnionPageElements from "./UnionPageElements";

const UnionPage = () => {
  const { data, status, error, isLoading } = useQuery<UnionData[]>({
    queryKey: ["union_data"],
    queryFn: fetchUnionDataClient,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <div className="own_edge">
        <div className="main_section !pt-0 min-h-[600px]">
          {" "}
          <p>Chyba pri načítaní dát...</p>;
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="own_edge">
        <div className="main_section !pt-0 min-h-[600px]">
          {" "}
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return status && data && <UnionPageElements data={data} />;
};

export default UnionPage;
