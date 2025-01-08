import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogIdToken, fetchBlogsToken } from "../../../lib/functions";
import { Blog } from "../../../lib/interface";
import AdminBlogPageIdComponent from "./AdminBlogPageIdComponent";

const AdminBlogPageId = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedElements =
    queryClient.getQueryData<Blog[]>(["admin_blogs"]) || [];

  const cachedElement = cachedElements.find((blog) => blog.id === id);
  const directCachedElement = queryClient.getQueryData<Blog>([
    "admin_blogs",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<Blog>({
    queryKey: ["admin_blogs", id],
    queryFn: () => fetchBlogIdToken(id),
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
      queryClient.getQueryData<Blog[]>(["admin_blogs"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Blog>(["admin_blogs", id], initialElementData);
    } else {
      const data2: Blog[] = await queryClient.fetchQuery({
        queryKey: ["admin_blogs"],
        queryFn: () => fetchBlogsToken(),
      });

      const cachedElement = data2.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Blog>(["admin_blogs", id], initialElementData);
    }
  };

  return (
    <div>
      {data && (
        <AdminBlogPageIdComponent
          data={data}
          onEventUpdated={revalidateFunction}
        />
      )}
    </div>
  );
};

export default AdminBlogPageId;
