import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchArchiveByYear } from "../../lib/functions";
import { Archive } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

const ArchivePageYear = () => {
  const queryClient = useQueryClient();
  const { year } = useParams<{ year: string }>();

  const cachedArchive =
    queryClient.getQueryData<Archive[]>(["archive", year]) || [];

  const { data, isLoading, error } = useQuery<Archive[]>({
    queryKey: ["archive", year],
    queryFn: () => fetchArchiveByYear(year),
    enabled: cachedArchive.length === 0,
  });

  if (isLoading)
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-screen ">
          {" "}
          <ButtonWithArrowLeft title="Späť do archívu" link={`/archiv`} />
          <h2 className="text-center uppercase">Dokumenty</h2>
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
        <ButtonWithArrowLeft title="Späť do archívu" link={`/archiv`} />
        <h2 className="text-center uppercase">Dokumenty</h2>
        {year === "pred-2019" ? (
          <h6>Archívne dokumenty z pred roka 2019</h6>
        ) : (
          <h6>Archívne dokumenty z roku {year}</h6>
        )}

        <div className="flex flex-col gap-4">
          {data?.map((object, index) => (
            <div className="flex flex-row items-center pt-4" key={index}>
              <Link
                to={object.pdf_link}
                target="_blank"
                key={index}
                className="underline"
              >
                {" "}
                {object.pdf_nazov}
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

export default ArchivePageYear;
