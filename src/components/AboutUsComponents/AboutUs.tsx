import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getAboutUsData } from "../../lib/functions";
import { AboutUsPage } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import AboutUsComponent from "./AboutUsComponent";

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
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <div className="max-w-[900px] m-auto mt-8">
            <h2 className="text-center">O nás</h2>
            <ClipLoader size={20} color={"#000000"} loading={true} />
          </div>
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
          {data && <AboutUsComponent data={data} />}
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
