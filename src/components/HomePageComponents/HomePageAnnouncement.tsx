import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncements } from "../../lib/functions";
import { Oznamy } from "../../lib/interface";
import HomePageAnnouncementComponent from "./HomePageAnnouncementComponent";

const HomePageAnnouncement = () => {
  const { data, error } = useQuery<Oznamy[]>({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <p>Error</p>;
  }

  if (data) {
    return <HomePageAnnouncementComponent data={data} />;
  }
};

export default HomePageAnnouncement;
