import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchArchiveByYear, getArchiveEvents } from "../../lib/functions";
import { ActualEvent, Archive } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import { ClipLoader } from "react-spinners";
import ArchivePageYearElement from "./ArchivePageYearElement";
import { Helmet } from "react-helmet-async";

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
          <h2 className="text-center uppercase mt-8">Dokumenty</h2>
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
      <Helmet>
        <title>Archív {year}</title>
        <meta name="description" content={`Archív dokumentov za rok ${year}`} />
        <meta
          name="keywords"
          content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
        />
        <meta name="author" content="Slovenský zväz záhradkárov" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.zvazzahradkarov.sk/archiv" />
        <meta property="og:title" content={`Archív ${year}`} />
        <meta
          property="og:description"
          content={`Archív dokumentov za rok ${year}`}
        />
        <meta
          property="og:url"
          content="https://www.zvazzahradkarov.sk/archiv"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="main_section !pt-8 min-h-screen ">
        <ButtonWithArrowLeft title="Späť do archívu" link={`/archiv`} />
        <h2 className="text-center uppercase mt-8">Dokumenty</h2>
        <div className="flex flex-col md:flex-row pt-8 gap-24 md:gap-8">
          <div className="flex flex-col md:w-1/2 order-2 md:order-1">
            {year === "pred-2019" ? (
              <h6>Archívne súbory z pred roka 2019</h6>
            ) : (
              <h6>Archívne súbory z roku {year}</h6>
            )}

            {data && <ArchivePageYearElement data={data} />}

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
