import { Link } from "react-router-dom";
import IconProtection from "../Icons/IconProtection";
import IconRadio from "../Icons/IconRadio";
import HomePageActualJobs from "./HomePageActualJobs";
import HomePageBlogSection from "./HomePageBlogSection";
import HomePageEvents from "./HomePageEvents";

const HomePage = () => {
  return (
    <>
      {/* <HomePagePranostika /> */}
      <div className="own_edge">
        <div className="main_section !pt-0 flex flex-col md:flex-row md:gap-16">
          <div className="flex flex-col">
            <h1 className="uppercase max-w-[680px]">
              Záhrada je miesto, kde príroda ožíva
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur.Convallis purus vehicula
              nisi rutrum.
            </p>
          </div>
          <div className="flex flex-col md:w-[50%]">
            <Link
              className="bg-[#EDF3DD] pl-[64px] pt-[37.5px] pb-[37.5px] pr-[40px] rounded-[24px] flex flex-row gap-16  items-center justify-between"
              to={"/zvaz"}
            >
              <h3 className="uppercase">Sekcia pre zväz</h3>
              <button className="btn btn--green">Otvoriť</button>
            </Link>
            <div className="flex flex-col md:flex-row md:gap-32">
              <div className="flex flex-row mt-16">
                <div className="flex flex-row gap-[16px]">
                  <div className="bg-[#6394A4] w-24 h-24 flex items-center justify-center rounded-[8px]">
                    <IconProtection />
                  </div>
                  <div className="flex flex-col">
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
                  <div className="flex flex-col">
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
    </>
  );
};

export default HomePage;
