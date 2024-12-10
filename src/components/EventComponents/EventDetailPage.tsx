import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ActualEvent } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import IconCalendar from "../Icons/IconCalendar";
import IconLocation from "../Icons/IconLocation";
import ButtonWithElement from "../ButtonWithElement";
import IconDownload from "../Icons/IconDownload";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import IconGuests from "../Icons/IconGuests";
import { ClipLoader } from "react-spinners";
import IconTime from "../Icons/IconTime";
import IconLink from "../Icons/IconLink";

const EventDetailPage = () => {
  const [open, setOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [data, setData] = useState<ActualEvent>();
  const [data2, setData2] = useState<ActualEvent[]>([]);
  const { slug } = useParams<{ slug: string }>();
  const [choosenAlbum, setChoosenAlbum] = useState<SlideImage[]>([]);

  const handleOpenGallery = (choosenArticel: ActualEvent, index: number) => {
    const transformedAlbum = choosenArticel.fotky.map((url) => ({ src: url }));
    setChoosenAlbum(transformedAlbum);
    setOpen(true);
    setInitialSlide(index);
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/events/geteventslug/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData != null) {
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData2 = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/events/getactualeventsexcept/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData != null) {
        setData2(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (slug) {
      getData();
      getData2();
    }
  }, [slug]);

  return (
    <div className="own_edge relative overflow-hidden">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft
          title="Späť ná všetky výstavy"
          link={`/vystavy-a-podujatia`}
        />
        {data ? (
          <>
            <div className="flex md:items-center flex-col gap-4">
              <h1 className="text-center pt-4">{data?.nazov_vystavy}</h1>
              <div className="flex flex-row gap-6  ">
                <IconCalendar />
                <p className="font-semibold uppercase">Dátum podujatia:</p>
                <p className="font-medium text-[#351A28] opacity-80 uppercase">
                  {data.datum_den}.{data.datum_mesiac}.{data.datum_rok}{" "}
                  {data.datum_koniec && `- ${data.datum_koniec}`}
                </p>
              </div>

              <div className="flex flex-row gap-6  ">
                <IconLocation />
                <p className="font-semibold uppercase">Miesto podujatia:</p>
                <p className="font-medium text-[#351A28] opacity-80 uppercase">
                  {data.miesto_podujatia}
                </p>
              </div>
              {data.cas && (
                <div className="flex flex-row gap-6  ">
                  <IconTime />
                  <p className="font-semibold uppercase">Začiatok podujatia:</p>
                  <p className="font-medium text-[#351A28] opacity-80 uppercase">
                    {data.cas}
                  </p>
                </div>
              )}

              {data.hostia && (
                <div className="flex flex-row gap-6  ">
                  <IconGuests />
                  <p className="font-semibold uppercase">Hostia:</p>
                  <p className="font-medium text-[#351A28] opacity-80 uppercase">
                    {data.hostia}
                  </p>
                </div>
              )}
              {data.link_podujatie && (
                <Link
                  className="flex flex-row gap-6  "
                  to={data.link_podujatie}
                  target="_blank"
                >
                  <IconLink />
                  <p className="font-semibold uppercase">Link podujatia</p>
                </Link>
              )}

              <img
                src={data.titulna_foto}
                width={900}
                height={900}
                className="rounded-[16px] w-full max-w-[1080px] max-h-[459px] object-cover mt-8"
              />
            </div>

            <div className="max-w-[900px] m-auto mt-[80px]">
              {data.text1 && (
                <div
                  className="content mt-[40px] "
                  dangerouslySetInnerHTML={{ __html: data.text1 }}
                />
              )}
              {data.pdf.length > 0 && (
                <>
                  <h5 className="uppercase mt-[80px]">Dokumenty k podujatiu</h5>
                  <div className="flex flex-wrap gap-4">
                    {data?.pdf.map((object, index) => (
                      <Link to={object.link} target="_blank" key={index}>
                        <ButtonWithElement
                          text={object.nazov}
                          element={<IconDownload />}
                        />
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {data.fotky.length > 0 && (
                <>
                  <h5 className="mt-[40px]">Súvisiace fotogragie</h5>
                  <div className="flex flex-row gap-4">
                    {" "}
                    {data?.fotky.map(
                      (object, index) =>
                        object != "" && (
                          <img
                            src={object}
                            key={index}
                            className="max-w-[150px] max-h-[150px] rounded-[16px] w-full h-full object-cover cursor-pointer hover:scale-[1.02] duration-200"
                            onClick={() => handleOpenGallery(data, index)}
                          />
                        )
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="min-h-[600px]">
            <ClipLoader
              size={20}
              color={"#000000"}
              loading={true}
              className="mt-4 mb-4"
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between mt-[80px] md:items-center mb-8 md:mb-[32px]">
          <h2 className="uppercase ">Ďalšie podujatia</h2>
          <ButtonWithArrow
            title="Zobraziť všetky"
            link={`/vystavy-a-podujatia`}
          />
        </div>

        {data2 ? (
          <div className="flex flex-col md:flex-row gap-[24px]">
            {data2.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] w-full max-w-[464px] hover:scale-[1.02] duration-200`}
                key={index}
                to={`/vystavy-a-podujatia/${object.slug}`}
              >
                <div key={index} className="relative w-full h-[280px]">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[16px]"></div>
                  <img
                    src={object.titulna_foto}
                    className="rounded-[16px] w-full h-full object-cover relative z-10 cursor-pointer hover:scale-[1.02] duration-200"
                  />
                </div>
                <div className="flex flex-row gap-6 pt-[24px] opacity-60">
                  <IconCalendar />
                  <p className="font-medium">
                    {object.datum_den}.{object.datum_mesiac}.{object.datum_rok}{" "}
                    {object.datum_koniec && `- ${object.datum_koniec}`}
                  </p>
                </div>

                <h5 className="pt-[8px]">{object.nazov_vystavy}</h5>
              </Link>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {open && (
        <Lightbox
          open={open}
          slides={choosenAlbum}
          close={() => setOpen(false)}
          index={initialSlide}
        />
      )}
      <img
        src={"/icons/icon_event_id_left.svg"}
        className="absolute h-[578px] w-[373px] -left-40 top-[40%] hidden 3xl:block"
      />
      <img
        src={"/icons/icon_event_id_right.svg"}
        className="absolute h-[578px] w-[373px] -right-40 top-[10%] hidden 3xl:block"
      />
    </div>
  );
};

export default EventDetailPage;
