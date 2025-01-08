import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getZlavyPage } from "../lib/functions";

import { GeneralPageInterface } from "../lib/interface";
import AttachedFiles from "./AttachedFiles";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";
import SeoElement from "./SeoElement";

const DiscountPage = () => {
  const { data, status, error, isLoading } = useQuery<GeneralPageInterface>({
    queryKey: ["discount_page"],
    queryFn: getZlavyPage,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <div className="max-w-[900px] m-auto mt-8">
            <h2 className="text-center">Zľavy pre členov</h2>
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
      <SeoElement
        slug="zlavy"
        title="Zľavy pre členov"
        description="V priloženom dokumente nájdete možnosti využitia zliav."
      />

      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">Zľavy pre členov</h2>
          {data && (
            <div>
              <div
                className="content pt-4"
                dangerouslySetInnerHTML={{ __html: data.text1 }}
              />
              <AttachedFiles pdf={data.pdf} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
