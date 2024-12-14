import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getPoradnaPage } from "../lib/functions";
import { GeneralPageInterface } from "../lib/interface";

import AttachedFiles from "./AttachedFiles";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";
import { Helmet } from "react-helmet-async";

const PoradnaPage = () => {
  const { data, status, error, isLoading } = useQuery<GeneralPageInterface>({
    queryKey: ["poradna_page"],
    queryFn: getPoradnaPage,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <div className="max-w-[900px] m-auto mt-8">
            <h2 className="text-center">Poradne</h2>
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
        <Helmet>
          <title>Poradne</title>
          <meta
            name="description"
            content="Služby všetkých poradní sú určené pre členov szz s vyrovnanými záväzkami zdarma."
          />
          <meta
            name="keywords"
            content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
          />
          <meta name="author" content="Slovenský zväz záhradkárov" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="canonical" href="https://www.zvazzahradkarov.sk/poradna" />
          <meta property="og:title" content="Dôležité tlačivá na stiahnutie" />
          <meta
            property="og:description"
            content="Služby všetkých poradní sú určené pre členov szz s vyrovnanými záväzkami zdarma."
          />
          <meta
            property="og:url"
            content="https://www.zvazzahradkarov.sk/poradna"
          />
          <meta property="og:type" content="website" />
        </Helmet>
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">Poradne</h2>
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

export default PoradnaPage;
