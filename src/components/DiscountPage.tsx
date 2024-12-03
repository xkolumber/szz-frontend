import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getActualityPageData } from "../lib/functions";
import { ActualityPageInterface } from "../lib/interface";

import ButtonWithArrowLeft from "./ButtonWithArrowLeft";
import { Link } from "react-router-dom";

const DiscountPage = () => {
  const { data, status, error, isLoading } = useQuery<ActualityPageInterface>({
    queryKey: ["actuality_page"],
    queryFn: getActualityPageData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-8">
          <ClipLoader size={20} color={"#000000"} loading={true} />
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
          <h2 className="text-center">Zľavy pre členov</h2>
          {data && (
            <div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: data.text1 }}
              />

              <div className="flex flex-col gap-1 pt-4">
                {data.pdf?.map((object, index) => (
                  <div className="flex flex-row items-center">
                    <Link
                      to={object.link}
                      target="_blank"
                      key={index}
                      className="underline"
                    >
                      {" "}
                      {object.nazov}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
