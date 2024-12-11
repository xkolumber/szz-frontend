import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

import { fetchSpravodajciClient } from "../../lib/functions";
import { Spravodajca } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import SpravodajcaPageComponent from "./SpravodajcaPageComponent";

const SpravodajcaPage = () => {
  const { data, status, error, isLoading } = useQuery<Spravodajca[]>({
    queryKey: ["spravodajca_page"],
    queryFn: fetchSpravodajciClient,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <div className="max-w-[900px] m-auto mt-8">
            <h2 className="text-center">Spravodajca</h2>
            <ClipLoader size={20} color={"#000000"} loading={true} />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      {data && <SpravodajcaPageComponent data={data} />}
    </div>
  );
};

export default SpravodajcaPage;
