import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchBlogs } from "../../lib/functions";
import { LIMIT_BLOG } from "../../lib/functionsClient";
import { Blog } from "../../lib/interface";
import { Link } from "react-router-dom";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

const BlogsPage = () => {
  const queryClient = useQueryClient();
  const [limit, setLimit] = useState(LIMIT_BLOG);

  const cachedBlogs = queryClient.getQueryData<Blog[]>(["blogs"]);

  const {
    data: existingBlogs = cachedBlogs || [],
    isLoading,
    error,
  } = useQuery<Blog[]>({
    queryKey: ["blogs", limit],
    queryFn: () => fetchBlogs(limit),
    staleTime: 1000 * 60 * 10,
    enabled: !cachedBlogs && limit > 0,
  });

  const handleLoadMore = async () => {
    const newLimit = limit + LIMIT_BLOG;
    setLimit(newLimit);

    const existingData = queryClient.getQueryData<Blog[]>(["blogs", newLimit]);
    if (existingData) {
      return setLimit(newLimit);
    }

    const newBlogs = await fetchBlogs(newLimit);
    queryClient.setQueryData(["blogs", newLimit], (oldData: Blog[] = []) => {
      return [...oldData, ...newBlogs];
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="own_edge min-h-screen">
      <div className="main_section">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/blog`} />
        <h2 className="uppercase text-center">Záhradkársky blog</h2>
        {existingBlogs && existingBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {existingBlogs.map((object, index) => (
              <Link
                className={`flex flex-col rounded-[24px] w-full hover:scale-[1.02] duration-200`}
                key={index}
                to={`/blog/${object.slug}`}
              >
                <img
                  src={object.titulna_foto}
                  className="rounded-[16px] max-h-[280px]"
                />
                <h5 className="pt-[8px]">{object.nazov_blog}</h5>
                <p className="opacity-80 line-clamp-4">{object.popis1}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No blogs available.</p>
        )}
        <button onClick={handleLoadMore}>Load More Blogs</button>
      </div>
    </div>
  );
};

export default BlogsPage;
