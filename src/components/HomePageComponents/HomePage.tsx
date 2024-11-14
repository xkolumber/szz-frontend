import HomePageActualJobs from "./HomePageActualJobs";
import HomePageBlogSection from "./HomePageBlogSection";
import HomePageEvents from "./HomePageEvents";
import HomePageFaq from "./HomePageFaq";
import HomePageIntro from "./HomePageIntro";

const HomePage = () => {
  return (
    <>
      <HomePageIntro />

      <div className="z-[200] relative">
        <HomePageActualJobs />
      </div>
      <HomePageEvents />
      <HomePageBlogSection />
      <HomePageFaq />
    </>
  );
};

export default HomePage;
