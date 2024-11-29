import { useQuery } from "@tanstack/react-query";
import { getAboutUsData } from "../lib/functions";
import { AboutUsPage } from "../lib/interface";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";

const AboutUs = () => {
  const { data, status, error, isLoading } = useQuery<AboutUsPage>({
    queryKey: ["about_us"],
    queryFn: getAboutUsData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-0">
          <p>Loading...</p>
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
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">O nás</h2>
          {data && (
            <div>
              <p className="pt-8">{data.text1}</p>
              <img
                width={120}
                height={120}
                src={data.foto1}
                className="mt-4 mb-4 cursor-pointer object-cover w-full h-full rounded-[16px]"
              />
              {data.text2 && <p className="mt-[40px]">{data.text2}</p>}

              {data.foto2 && (
                <img
                  width={120}
                  height={120}
                  src={data.foto2}
                  className="mt-4 mb-4 cursor-pointer object-cover w-full h-full rounded-[16px]"
                />
              )}
              {data.text3 && <p className="mt-[40px]">{data.text2}</p>}
              {data.foto3 && (
                <img
                  width={600}
                  height={600}
                  src={data.foto3}
                  className="mt-4 mb-4 cursor-pointer object-cover w-full h-full rounded-[16px]"
                />
              )}
              <h5 className="upperecase pt-8">Ako sa k nám dostanete</h5>

              <iframe
                title="Bratislava Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10706.218176607592!2d17.0986359!3d48.1566009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8bfdb8b3c737%3A0xca68190e08a57721!2sSlovensk%C3%BD%20zv%C3%A4z%20z%C3%A1hradk%C3%A1rov%20%E2%80%93%20Republikov%C3%BD%20v%C3%BDbor!5e0!3m2!1ssk!2ssk!4v1699213019176!5m2!1ssk!2ssk"
                allowFullScreen={true}
                loading="lazy"
                className="rounded-[16px] w-full h-[400px]"
              ></iframe>
              <div className="flex flex-row justify-between opacity-60 mt-16">
                <p className="uppercase font-semibold ">
                  Publikované {data.datum}
                </p>
                <p
                  className="uppercase font-semibold cursor-pointer"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Späť na začiatok{" "}
                </p>
              </div>
            </div>
          )}
        </div>

        <img
          src={"/icons/icon_about_us_left.svg"}
          className="absolute h-[578px] w-[373px] -left-80 top-[15%] hidden 3xl:block"
        />
        <img
          src={"/icons/icon_about_us_left_2.svg"}
          className="absolute h-[578px] w-[373px] -left-72 top-[45%] hidden 3xl:block"
        />
        <img
          src={"/icons/icon_about_us_right.svg"}
          className="absolute h-[578px] w-[373px] -right-60 top-[5%] hidden 3xl:block"
        />
        <img
          src={"/icons/icon_about_us_right_2.svg"}
          className="absolute h-[578px] w-[373px] -right-40 top-[35%] hidden 3xl:block"
        />
      </div>
    </div>
  );
};

export default AboutUs;
