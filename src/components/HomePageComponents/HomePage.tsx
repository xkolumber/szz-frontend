import HomePageActualJobs from "./HomePageActualJobs";
import HomePageAnnouncement from "./HomePageAnnouncement";
import HomePageBlogSection from "./HomePageBlogSection";
import HomePageEvents from "./HomePageEvents";
import HomePageFaq from "./HomePageFaq";
import HomePageIntro from "./HomePageIntro";

const HomePage = () => {
  return (
    <>
      <HomePageAnnouncement />

      <HomePageIntro />

      <div className="z-[200] relative">
        <HomePageEvents />
      </div>
      <div className="z-[200] relative">
        <HomePageActualJobs />
      </div>

      <HomePageBlogSection />
      <HomePageFaq />
    </>
  );
};

export default HomePage;
