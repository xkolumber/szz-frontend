import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchEventIdToken,
  getActualEventsYearToken,
} from "../../../lib/functions";
import { ActualEvent } from "../../../lib/interface";
import AdminEventPageIdComponent from "./AdminEventPageIdComponent";

const AdminEventPageId = () => {
  const queryClient = useQueryClient();
  const { rok, id } = useParams<{ id: string; rok: string }>();

  const cachedElements =
    queryClient.getQueryData<ActualEvent[]>(["admin_events"]) || [];

  const cachedElement = cachedElements.find((event) => event.id === id);
  const directCachedEvent = queryClient.getQueryData<ActualEvent>([
    "admin_events",
    id,
  ]);

  const initialElementData = directCachedEvent || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<ActualEvent>({
    queryKey: ["admin_events", id],
    queryFn: () => fetchEventIdToken(id),
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
      queryClient.getQueryData<ActualEvent[]>(["admin_events"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((object) => object.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<ActualEvent>(
        ["admin_events", id],
        initialElementData
      );
    } else {
      if (rok) {
        const data2: ActualEvent[] = await queryClient.fetchQuery({
          queryKey: ["admin_events", rok],
          queryFn: () => getActualEventsYearToken(rok),
        });

        const cachedElement = data2.find((object) => object.id === id);

        const initialElementData = cachedElement;
        queryClient.setQueryData<ActualEvent>(
          ["admin_events", id],
          initialElementData
        );
      }
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
    </div>
  );
};

export default AdminEventPageId;
