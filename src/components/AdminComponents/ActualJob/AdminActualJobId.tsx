import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogIdToken, fetchBlogsToken } from "../../../lib/functions";
import { ActualJob } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminActualJobIdComponent from "./AdminActualJobIdComponent";

const AdminActualJobId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedElements =
    queryClient.getQueryData<ActualJob[]>(["admin_jobs"]) || [];

  const cachedElement = cachedElements.find((blog) => blog.id === id);
  const directCachedElement = queryClient.getQueryData<ActualJob>([
    "admin_jobs",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<ActualJob>({
    queryKey: ["admin_jobs", id],
    queryFn: () => fetchBlogIdToken(token, id),
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
      queryClient.getQueryData<ActualJob[]>(["admin_jobs"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<ActualJob>(
        ["admin_jobs", id],
        initialElementData
      );
    } else {
      const data2: ActualJob[] = await queryClient.fetchQuery({
        queryKey: ["admin_jobs"],
        queryFn: () => fetchBlogsToken(token),
      });

      const cachedElement = data2.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<ActualJob>(
        ["admin_jobs", id],
        initialElementData
      );
    }
  };

  return (
    <div>
      {data && (
        <AdminActualJobIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}

      {data == null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminActualJobId;
