import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getContactPageClient } from "../lib/functions";

import { ContactPageInterface } from "../lib/interface";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";
import SeoElement from "./SeoElement";
import { replaceS3UrlsWithCloudFront } from "../lib/functionsClient";

const ContactPage = () => {
  const { data, status, error, isLoading } = useQuery<ContactPageInterface>({
    queryKey: ["contact"],
    queryFn: getContactPageClient,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-8">
          <ClipLoader size={20} color={"#000000"} loading={true} />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <SeoElement
        title="Kontakt"
        description="Slovenský zväz záhradkárov je komunita nadšencov záhradkárstva na Slovensku. Objavte užitočné rady, tipy na pestovanie a zapojte sa do aktivít, ktoré podporujú lásku k prírode a záhradkárstvu."
        image="https://szzimagesalll.s3.eu-north-1.amazonaws.com/2024/a55a601c-dff3-4dc0-8b6b-6063c9ee166d/1.jpg"
      />

      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">Kontakt</h2>
          {data && (
            <div>
              <div className="relative w-full h-[369px]">
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[16px]"></div>
                <img
                  width={120}
                  height={120}
                  src={replaceS3UrlsWithCloudFront(data.foto1, "blogphoto")}
                  className="mt-4 mb-4 w-full h-full object-cover rounded-[16px] max-h-[369px] z-10 relative"
                />
              </div>
              <h5 className="upperecase pt-8">Ako sa k nám dostanete</h5>

              <iframe
                title="Bratislava Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10706.218176607592!2d17.0986359!3d48.1566009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8bfdb8b3c737%3A0xca68190e08a57721!2sSlovensk%C3%BD%20zv%C3%A4z%20z%C3%A1hradk%C3%A1rov%20%E2%80%93%20Republikov%C3%BD%20v%C3%BDbor!5e0!3m2!1ssk!2ssk!4v1699213019176!5m2!1ssk!2ssk"
                allowFullScreen={true}
                loading="lazy"
                className="rounded-[16px] w-full h-[400px]"
              ></iframe>
              {data.text1 && (
                <div
                  className="content mt-[40px] "
                  dangerouslySetInnerHTML={{ __html: data.text1 }}
                />
              )}

              <div className="flex flex-row justify-between opacity-60 mt-16">
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

export default ContactPage;
