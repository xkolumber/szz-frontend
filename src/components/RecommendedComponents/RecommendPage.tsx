import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import "yet-another-react-lightbox/styles.css";
import { fetchSponsorsClient } from "../../lib/functions";
import { Sponsor } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import RecommendPageElements from "./RecommendPageElements";

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
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <h2 className="text-center pt-8">Odporúčame</h2>
          <ClipLoader size={20} color={"#000000"} loading={true} />
        </div>
      </div>
    );
  }

  return status && data && <RecommendPageElements data={data} />;
};

export default RecommendPage;
