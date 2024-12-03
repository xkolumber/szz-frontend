import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchAnnouncementIdToken,
  fetchAnnouncementsToken,
} from "../../../lib/functions";
import { Oznamy } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminAnnPageIdComponent from "./AdminAnnPageIdComponent";

const AdminAnnPageId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedElements =
    queryClient.getQueryData<Oznamy[]>(["admin_announcements"]) || [];

  const cachedElement = cachedElements.find((blog) => blog.id === id);
  const directCachedElement = queryClient.getQueryData<Oznamy>([
    "admin_announcements",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<Oznamy>({
    queryKey: ["admin_announcements", id],
    queryFn: () => fetchAnnouncementIdToken(token, id),
    enabled: !initialElementData,
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
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-0">
          <p>Error</p>
        </div>
      </div>
    );
  }

  const revalidateFunction = async () => {
    const cachedElements =
      queryClient.getQueryData<Oznamy[]>(["admin_announcements"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Oznamy>(
        ["admin_announcements", id],
        initialElementData
      );
    } else {
      const data2: Oznamy[] = await queryClient.fetchQuery({
        queryKey: ["admin_announcements"],
        queryFn: () => fetchAnnouncementsToken(token),
      });

      const cachedElement = data2.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Oznamy>(
        ["admin_announcements", id],
        initialElementData
      );
    }
  };

  return (
    <div>
      {data && (
        <AdminAnnPageIdComponent
          data={data}
          onEventUpdated={revalidateFunction}
        />
      )}

      {data == null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminAnnPageId;
