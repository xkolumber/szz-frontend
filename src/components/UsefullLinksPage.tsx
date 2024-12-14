import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getUzitocneLinkyPage } from "../lib/functions";

import { Link } from "react-router-dom";
import { GeneralPageInterface } from "../lib/interface";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";
import { Helmet } from "react-helmet-async";

const UsefullLinksPage = () => {
  const { data, status, error, isLoading } = useQuery<GeneralPageInterface>({
    queryKey: ["usefull_links"],
    queryFn: getUzitocneLinkyPage,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <div className="max-w-[900px] m-auto mt-8">
            <h2 className="text-center">Užitočné linky</h2>
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
      <Helmet>
        <title>Užitočné linky</title>
        <meta name="description" content="Zoznam užitočných linkov" />
        <meta
          name="keywords"
          content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz, užitočné linky"
        />
        <meta name="author" content="Slovenský zväz záhradkárov" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href="https://www.zvazzahradkarov.sk/uzitocne-linky"
        />
        <meta property="og:title" content="Zoznam užitočných linkov" />
        <meta property="og:description" content="Zoznam užitočných linkov" />
        <meta
          property="og:url"
          content="https://www.zvazzahradkarov.sk/uzitocne-linky"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">Užitočné linky</h2>
          {data && (
            <div>
              <div
                className="content pt-4"
                dangerouslySetInnerHTML={{ __html: data.text1 }}
              />

              <div className="flex flex-col gap-1 pt-4">
                {data.pdf?.map((object, index) => (
                  <div className="flex flex-row items-center" key={index}>
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

export default UsefullLinksPage;
