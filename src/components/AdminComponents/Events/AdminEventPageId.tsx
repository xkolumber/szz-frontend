import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchEventIdToken, fetchEventsToken } from "../../../lib/functions";
import { ActualEvent } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminEventPageIdComponent from "./AdminEventPageIdComponent";

const AdminEventPageId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedEvents =
    queryClient.getQueryData<ActualEvent[]>(["admin_events"]) || [];

  const cachedEvent = cachedEvents.find((event) => event.id === id);
  const directCachedEvent = queryClient.getQueryData<ActualEvent>([
    "admin_events",
    id,
  ]);

  const initialEventData = directCachedEvent || cachedEvent;

  const {
    data = initialEventData,
    isLoading,
    status,
  } = useQuery<ActualEvent>({
    queryKey: ["admin_events", id],
    queryFn: () => fetchEventIdToken(token, id),
    enabled: !initialEventData,
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
    const cachedEvents =
      queryClient.getQueryData<ActualEvent[]>(["admin_events"]) || [];

    if (cachedEvents.length > 0) {
      const cachedEvent = cachedEvents.find((event) => event.id === id);

      const initialEventData = cachedEvent;
      queryClient.setQueryData<ActualEvent>(
        ["admin_events", id],
        initialEventData
      );
    } else {
      const data2: ActualEvent[] = await queryClient.fetchQuery({
        queryKey: ["admin_events"],
        queryFn: () => fetchEventsToken(token),
      });

      const cachedEvent = data2.find((event) => event.id === id);

      const initialEventData = cachedEvent;
      queryClient.setQueryData<ActualEvent>(
        ["admin_events", id],
        initialEventData
      );
    }
  };

  return (
    <div>
      {data && (
        <AdminEventPageIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}

      {data == null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminEventPageId;
