import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchDocsClient } from "../lib/functions";
import { Tlacivo } from "../lib/interface";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";

const DocumentsPage = () => {
  const queryClient = useQueryClient();

  const cachedArchive =
    queryClient.getQueryData<Tlacivo[]>(["documents"]) || [];

  const { data, isLoading, error } = useQuery<Tlacivo[]>({
    queryKey: ["documents"],
    queryFn: () => fetchDocsClient(),
    enabled: cachedArchive.length === 0,
  });

  if (isLoading)
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-screen ">
          {" "}
          <h2>Tlačivá na stiahnutie</h2>
          <p>Loading...</p>
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
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="text-center uppercase">Tlačivá na stiahnutie</h2>
        <div className="flex flex-col gap-4">
          {data?.map((object, index) => (
            <div className="flex flex-row items-center pt-4">
              <Link
                to={object.link}
                target="_blank"
                key={index}
                className="underline"
              >
                {" "}
                {object.nazov}
              </Link>
              <p className="uppercase">, ({object.typ})</p>
            </div>
          ))}
        </div>
        {data?.length === 0 && (
          <p>V tejto sekcii zatiaľ nie sú žiadne dokumenty.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
