import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { fetchDiplomas, fetchDocsClient } from "../../lib/functions";
import { Diplomas, Tlacivo } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import DiplomasComponents from "./DiplomasComponents";
import DocumentsPageComponent from "./DocumentsPageComponent";
import { Helmet } from "react-helmet-async";

const DocumentsPage = () => {
  const queryClient = useQueryClient();

  const cachedArchive =
    queryClient.getQueryData<Tlacivo[]>(["documents"]) || [];

  const { data, isLoading, error } = useQuery<Tlacivo[]>({
    queryKey: ["documents"],
    queryFn: () => fetchDocsClient(),
    enabled: cachedArchive.length === 0,
  });

  const cachedDiplomas =
    queryClient.getQueryData<Diplomas[]>(["diplomas"]) || [];

  const { data: data2 } = useQuery<Diplomas>({
    queryKey: ["diplomas"],
    queryFn: () => fetchDiplomas(),
    enabled: cachedDiplomas.length === 0,
  });

  if (isLoading)
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-screen ">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <div className="max-w-[900px] m-auto mt-8">
            <h2 className="text-center uppercase">Tlačivá na stiahnutie</h2>
            <ClipLoader size={20} color={"#000000"} loading={true} />
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-screen ">
          Error: {error.message}
        </div>
      </div>
    );

  return (
    <div className="own_edge">
      <div className="main_section !pt-8 min-h-screen ">
        <Helmet>
          <title>Tlačivá na stiahnutie</title>
          <meta name="description" content="Dôležité tlačivá na stiahnutie" />
          <meta
            name="keywords"
            content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
          />
          <meta name="author" content="Slovenský zväz záhradkárov" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="canonical" href="https://www.zvazzahradkarov.sk/tlaciva" />
          <meta property="og:title" content="Tlačivá na stiahnutie" />
          <meta
            property="og:description"
            content="Dôležité tlačivá na stiahnutie"
          />
          <meta
            property="og:url"
            content="https://www.zvazzahradkarov.sk/tlaciva"
          />
          <meta property="og:type" content="website" />
        </Helmet>
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center uppercase">Tlačivá na stiahnutie</h2>
          {data && <DocumentsPageComponent data={data} />}

          {data?.length === 0 && (
            <p>V tejto sekcii zatiaľ nie sú žiadne dokumenty.</p>
          )}

          {data2 && <DiplomasComponents data={data2} />}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
