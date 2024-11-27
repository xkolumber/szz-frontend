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
            <div className="flex flex-row justify-between opacity-60 mt-16">
              <p className="uppercase font-semibold ">
                Publikované {data.datum}
              </p>
              <p className="uppercase font-semibold">Späť na začiatok </p>
            </div>
          </div>
        )}

        <img
          src={"/icons/icon_about_us_left.svg"}
          className="absolute h-[578px] w-[373px] -left-40 top-[15%] hidden 3xl:block"
        />
        <img
          src={"/icons/icon_about_us_left_2.svg"}
          className="absolute h-[578px] w-[373px] -left-40 top-[45%] hidden 3xl:block"
        />
        <img
          src={"/icons/icon_about_us_right.svg"}
          className="absolute h-[578px] w-[373px] -right-40 top-[5%] hidden 3xl:block"
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
