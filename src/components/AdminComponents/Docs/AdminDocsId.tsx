import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDocIdToken, fetchDocsToken } from "../../../lib/functions";
import { Tlacivo } from "../../../lib/interface";

import AdminDocsIdComponent from "./AdminDocsIdComponent";

const AdminDocsId = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedElements =
    queryClient.getQueryData<Tlacivo[]>(["admin_docs"]) || [];

  const cachedElement = cachedElements.find((blog) => blog.id === id);
  const directCachedElement = queryClient.getQueryData<Tlacivo>([
    "admin_docs",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<Tlacivo>({
    queryKey: ["admin_docs", id],
    queryFn: () => fetchDocIdToken(id),
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
      queryClient.getQueryData<Tlacivo[]>(["admin_docs"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Tlacivo>(["admin_docs", id], initialElementData);
    } else {
      const data2: Tlacivo[] = await queryClient.fetchQuery({
        queryKey: ["admin_docs"],
        queryFn: () => fetchDocsToken(),
      });

      const cachedElement = data2.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Tlacivo>(["admin_docs", id], initialElementData);
    }
  };

  return (
    <div>
      {data && (
        <AdminDocsIdComponent data={data} onDataUpdated={revalidateFunction} />
      )}
    </div>
  );
};

export default AdminDocsId;
