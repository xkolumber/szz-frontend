import { replaceS3UrlsWithCloudFront } from "../../lib/functionsClient";
import SeoElement from "../SeoElement";
import HomePageActualJobs from "./HomePageActualJobs";
import HomePageAnnouncement from "./HomePageAnnouncement";
import HomePageBlogSection from "./HomePageBlogSection";
import HomePageEvents from "./HomePageEvents";
import HomePageFaq from "./HomePageFaq";
import HomePageIntro from "./HomePageIntro";

const HomePage = () => {
  return (
    <>
      <SeoElement
        slug={``}
        title="Slovenský zväz záhradkárov"
        description="Slovenský zväz záhradkárov je komunita nadšencov záhradkárstva na Slovensku. Objavte užitočné rady, tipy na pestovanie a zapojte sa do aktivít, ktoré podporujú lásku k prírode a záhradkárstvu."
        image={replaceS3UrlsWithCloudFront(
          "https://szzimagesalll.s3.eu-north-1.amazonaws.com/2024/a55a601c-dff3-4dc0-8b6b-6063c9ee166d/1.jpg",
          "imagesalll"
        )}
      />
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
