import { Link } from "react-router-dom";
import IconProtection from "../Icons/IconProtection";
import IconRadio from "../Icons/IconRadio";
import HomePageActualJobs from "./HomePageActualJobs";
import HomePageBlogSection from "./HomePageBlogSection";
import HomePageEvents from "./HomePageEvents";
import HomePageFaq from "./HomePageFaq";
import ButtonWithArrow from "../ButtonWithArrow";
import IconApples from "../Icons/IconApples";
import IconScissors from "../Icons/IconScissors";

const HomePage = () => {
  return (
    <>
      {/* <HomePagePranostika /> */}
      <div className="own_edge">
        <div className="main_section  flex flex-col md:flex-row md:gap-16">
          <div className="flex flex-col">
            <h1 className="uppercase max-w-[680px] text-center md:text-left">
              Záhrada je miesto, kde príroda ožíva
            </h1>
            <p className="max-w-[400px] opacity-80 text-center md:text-left">
              Lorem ipsum dolor sit amet consectetur.Convallis purus vehicula
              nisi rutrum.
            </p>
            <div className="flex flex-row gap-16 mt-16">
              <ButtonWithArrow
                link="zvaz"
                title="Kto sme"
                bg="#6B9156"
                color="#ffffff"
              />
              <div className="flex flex-row items-center gap-4">
                <p className="uppercase font-bold hover:underline cursor-pointer">
                  Čo robíme
                </p>
                <IconScissors />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-[50%]">
            <Link
              className="bg-[#3F8124] mt-8 md:mt-0 p-8 xl:pl-[64px] xl:pt-[37.5px] xl:pb-[37.5px] xl:pr-[40px] rounded-[24px] flex flex-col md:flex-row gap-4 md:gap-16  items-center justify-between"
              to={"/zvaz"}
            >
              <h3 className="uppercase text-white">Sekcia pre zväz</h3>
              <div className="w-full md:w-auto">
                {" "}
                <ButtonWithArrow
                  link="zvaz"
                  title="Otvoriť"
                  bg="#ffffff"
                  color="#47261C"
                  justifyCenterMobile={true}
                />
              </div>
            </Link>
            <div className="flex flex-row mt-8 items-center0 gap-8">
              <IconApples />
              <div className="flex flex-col opacity-80 justify-center">
                <p className="text-[#47261C]">
                  Staňte sa vetvou v našom záhradkárskom rodokmeni.
                </p>
                <p className="font-bold text-[#47261C]">Tešíme sa na Vás!</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-32">
              <div className="flex flex-row mt-16">
                <div className="flex flex-row gap-[16px]">
                  <div className="bg-[#739C65] w-24 h-24 flex items-center justify-center rounded-[8px]">
                    <IconProtection />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h6 className="uppercase">Ochrana rastlín</h6>
                    <p>Ing. Matlák</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-16">
                <div className="flex flex-row gap-[16px]">
                  <div className="bg-[#739C65] w-24 h-24 flex items-center justify-center rounded-[8px]">
                    <IconRadio />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h6 className="uppercase">Rádio Regina</h6>
                    <p>Záhradkári</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <SmoothCorner>
          <h3 className="uppercase">Sekcia pre zväz</h3>
          <button className="btn btn--green">Otvoriť</button>
        </SmoothCorner> */}
      </div>

      <HomePageActualJobs />
      <HomePageEvents />
      <HomePageBlogSection />
      <HomePageFaq />
    </>
  );
};

export default HomePage;
