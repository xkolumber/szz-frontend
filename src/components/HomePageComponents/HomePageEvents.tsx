import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getActualThreeEvents } from "../../lib/functions";
import { ActualEvent } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import EventHomePageSkeleton from "../EventComponents/EventHomePageSkeleton";
import IconBgBroownBottom from "../Icons/IconBgBroownBottom";
import IconBgBroownTop from "../Icons/IconBgBroownTop";
import IconCalendar from "../Icons/IconCalendar";
import { replaceS3UrlsWithCloudFront } from "../../lib/functionsClient";

const HomePageEvents = () => {
  const { data, status, error, isLoading } = useQuery<ActualEvent[]>({
    queryKey: ["three_events"],
    queryFn: getActualThreeEvents,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <>
        <IconBgBroownTop />
        <div className="relative own_edge bg-[#FFF2EC] overflow-hidden">
          <div className="main_section !pb-0 !pt-0">
            <div className="flex flex-col md:flex-row  justify-between  md:items-center mb-[32px]">
              <h2 className="uppercase text-center md:text-left">
                Tipy na výstavy a podujatia
              </h2>
              <div className="hidden md:block">
                <ButtonWithArrow
                  title="Zobraziť všetky"
                  link={`/vystavy-a-podujatia`}
                />
              </div>
            </div>
            <EventHomePageSkeleton />
          </div>
        </div>
        <IconBgBroownBottom />
      </>
    );
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <IconBgBroownTop />
      <div className="relative own_edge bg-[#FFF2EC] overflow-hidden">
        <div className="main_section !pb-0 !pt-0">
          <div className="flex flex-col md:flex-row  justify-between  md:items-center mb-[32px]">
            <h2 className="uppercase text-center md:text-left">
              Tipy na výstavy a podujatia
            </h2>
            <div className="hidden md:block">
              <ButtonWithArrow
                title="Zobraziť všetky"
                link={`/vystavy-a-podujatia`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {data &&
              data.slice(0, 3).map((object, index) => (
                <Link
                  className={`flex flex-col  rounded-[24px] max-w-[464px]  w-full hover:scale-[1.02] duration-200 `}
                  key={index}
                  to={`/vystavy-a-podujatia/${object.slug}`}
                >
                  {" "}
                  <img
                    src={replaceS3UrlsWithCloudFront(
                      object.titulna_foto,
                      "blogphoto"
                    )}
                    className="rounded-[16px] object-cover h-[280px]"
                  />
                  <div className="flex flex-row gap-6 pt-[24px] opacity-60">
                    <IconCalendar />
                    <p className="font-medium">
                      {object.datum_den}.{object.datum_mesiac}.
                      {object.datum_rok} {object.cas}{" "}
                      {object.datum_koniec && `- ${object.datum_koniec}`}
                    </p>
                  </div>
                  <h5 className="pt-[8px] uppercase">{object.nazov_vystavy}</h5>
                </Link>
              ))}
          </div>
          <div className="flex justify-center items-center md:hidden pt-8">
            <ButtonWithArrow
              title="Zobraziť všetky"
              link={`/vystavy-a-podujatia`}
            />
          </div>

          {/* <img
              src={"/icons/icon_event.svg"}
              className="absolute h-[578px] w-[373px] -left-40 top-0 hidden 3xl:block"
            /> */}
        </div>
      </div>
      <IconBgBroownBottom />
    </>
  );
};

export default HomePageEvents;
