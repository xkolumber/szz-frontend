import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogsToken } from "../../../lib/functions";
import { Blog } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminBlogPageIdComponent from "./AdminBlogPageIdComponent";

const AdminBlogPageId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedBlogs = queryClient.getQueryData<Blog[]>(["admin_blogs"]) || [];

  const cachedBlog = cachedBlogs.find((blog) => blog.id === id);
  const directCachedBlog = queryClient.getQueryData<Blog>(["admin_blogs", id]);

  const initialBlogData = directCachedBlog || cachedBlog;

  const {
    data = initialBlogData,
    isLoading,
    status,
  } = useQuery<Blog>({
    queryKey: ["admin_blogs", id],
    queryFn: () => fetchBlogsToken(token),
    enabled: !initialBlogData,
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

  return (
    <div>
      {data && <AdminBlogPageIdComponent data={data} />}

      {data == null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminBlogPageId;
