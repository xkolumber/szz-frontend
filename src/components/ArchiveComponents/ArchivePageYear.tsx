import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchArchiveByYear, getArchiveEvents } from "../../lib/functions";
import { ActualEvent, Archive } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import { ClipLoader } from "react-spinners";

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

  const cachedArchiveEvents =
    queryClient.getQueryData<ActualEvent[]>(["archive_events", year]) || [];

  const { data: data2, isLoading: isLoading2 } = useQuery<ActualEvent[]>({
    queryKey: ["archive_events", year],
    queryFn: () => getArchiveEvents(year!),
    enabled: cachedArchiveEvents.length === 0,
  });

  if (isLoading && isLoading2)
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-screen ">
          {" "}
          <ButtonWithArrowLeft title="Späť do archívu" link={`/archiv`} />
          <h2 className="text-center uppercase">Dokumenty</h2>
          <ClipLoader size={20} color={"#000000"} loading={true} />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="own_edge">
        <div className="main_section !pt-8 min-h-screen ">
          Error: {error?.message}
        </div>
      </div>
    );

  return (
    <div className="own_edge">
      <div className="main_section !pt-8 min-h-screen ">
        <ButtonWithArrowLeft title="Späť do archívu" link={`/archiv`} />
        <h2 className="text-center uppercase">Dokumenty</h2>
        <div className="flex flex-col md:flex-row pt-8 gap-24 md:gap-8">
          <div className="flex flex-col md:w-1/2 order-2 md:order-1">
            {year === "pred-2019" ? (
              <h6>Archívne súbory z pred roka 2019</h6>
            ) : (
              <h6>Archívne súbory z roku {year}</h6>
            )}

            <div className="flex flex-col gap-4">
              {data?.map((object, index) => (
                <span className="flex flex-row items-center pt-4" key={index}>
                  <Link
                    to={object.pdf_link}
                    target="_blank"
                    className="flex flex-row items-center gap-1 max-w-full overflow-hidden"
                  >
                    <p className="underline whitespace-nowrap overflow-hidden text-ellipsis inline">
                      {object.pdf_nazov}
                    </p>
                    <p className="uppercase whitespace-nowrap overflow-hidden text-ellipsis inline">
                      , ({object.typ})
                    </p>
                  </Link>
                </span>
              ))}
            </div>

            {data?.length === 0 && (
              <p>V tejto sekcii zatiaľ nie sú žiadne dokumenty.</p>
            )}
          </div>
          {data2 && data2.length > 0 && (
            <div className="flex flex-col md:w-1/2 order-1 md:order-2">
              <h6>Archívne pozvánky</h6>
              <div className="flex flex-col gap-4">
                {data2?.map((object, index) => (
                  <div className="flex flex-row items-center pt-4" key={index}>
                    <Link
                      to={`/vystavy-a-podujatia/${object.slug}`}
                      key={index}
                      className="underline"
                    >
                      {" "}
                      {object.nazov_vystavy}
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

export default ArchivePageYear;
