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
          <h2>Dokumenty</h2>
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
        <ButtonWithArrowLeft title="Späť do archívu" link={`/`} />
        <h2 className="text-center uppercase">Dokumenty</h2>
        <div className="flex flex-col gap-4">
          {data?.map((object, index) => (
            <Link
              to={object.pdf_link}
              target="_blank"
              key={index}
              className="underline"
            >
              {object.pdf_nazov}
            </Link>
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
