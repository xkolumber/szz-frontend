import { useQuery } from "@tanstack/react-query";
import "yet-another-react-lightbox/styles.css";
import { Sponsor } from "../../lib/interface";
import RecommendPageElements from "./RecommendPageElements";
import { fetchSponsorsClient } from "../../lib/functions";

const RecommendPage = () => {
  const { data, status, error, isLoading } = useQuery<Sponsor[]>({
    queryKey: ["sponsors"],
    queryFn: fetchSponsorsClient,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-[600px]">
          {" "}
          <p>Chyba pri načítaní dát...</p>;
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-[600px]">
          {" "}
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return status && data && <RecommendPageElements data={data} />;
};

export default RecommendPage;
