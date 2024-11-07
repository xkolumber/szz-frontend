import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchFaqIdToken, fetchFaqToken } from "../../../lib/functions";
import { Faq } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminFaqPageIdComponent from "./AdminFaqPageIdComponent";

const AdminFaqPageId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedElements = queryClient.getQueryData<Faq[]>(["admin_faq"]) || [];

  const cachedElement = cachedElements.find((event) => event.id === id);
  const directCachedEvent = queryClient.getQueryData<Faq>(["admin_faq", id]);

  const initialElementData = directCachedEvent || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<Faq>({
    queryKey: ["admin_faq", id],
    queryFn: () => fetchFaqIdToken(token, id),
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
    const cachedElements = queryClient.getQueryData<Faq[]>(["admin_faq"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((object) => object.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Faq>(["admin_faq", id], initialElementData);
    } else {
      const data2: Faq[] = await queryClient.fetchQuery({
        queryKey: ["admin_faq"],
        queryFn: () => fetchFaqToken(token),
      });

      const cachedElement = data2.find((object) => object.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Faq>(["admin_faq", id], initialElementData);
    }
  };

  return (
    <div>
      {data && (
        <AdminFaqPageIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}

      {data == null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminFaqPageId;
