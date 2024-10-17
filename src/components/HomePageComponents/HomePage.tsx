import HomePageActualJobs from "./HomePageActualJobs";
import HomePagePranostika from "./HomePagePranostika";

const HomePage = () => {
  return (
    <>
      <HomePagePranostika />
      <div className="own_edge">
        <div className="main_section !pt-0 flex flex-col md:flex-row">
          <div className="flex flex-col">
            <h1 className="uppercase max-w-[680px]">
              Záhrada je miesto, kde príroda ožíva
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur.Convallis purus vehicula
              nisi rutrum.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#EDF3DD] pl-[64px] pt-[37.5px] pb-[37.5px] pr-[40px] rounded-[24px] flex flex-row gap-16  items-center">
              <h3 className="uppercase">Sekcia pre zväz</h3>
              <button className="btn btn--green">Otvoriť</button>
            </div>
          </div>
        </div>
        {/* <SmoothCorner>
          <h3 className="uppercase">Sekcia pre zväz</h3>
          <button className="btn btn--green">Otvoriť</button>
        </SmoothCorner> */}
      </div>
      <HomePageActualJobs />
    </>
  );
};

export default HomePage;
