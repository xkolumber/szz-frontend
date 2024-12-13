import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getChildrenPageClient } from "../lib/functions";

import { GeneralPageInterface } from "../lib/interface";
import AttachedFiles from "./AttachedFiles";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";

const ChildrenPage = () => {
  const { data, status, error, isLoading } = useQuery<GeneralPageInterface>({
    queryKey: ["children_page"],
    queryFn: getChildrenPageClient,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <div className="max-w-[900px] m-auto mt-8">
            <h2 className="text-center">Deti a mládež</h2>
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
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">Deti a mládež</h2>
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

export default ChildrenPage;
