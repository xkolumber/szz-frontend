import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../lib/functions";
import { Blog } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import { LIMIT_BLOG } from "../../lib/functionsClient";

const HomePageBlogSection = () => {
  const queryClient = useQueryClient();

  const cachedBlogs = queryClient.getQueryData<Blog[]>(["blogs", LIMIT_BLOG]);

  const {
    data: existingBlogs = cachedBlogs || [],
    isLoading,
    status,
    error,
  } = useQuery<Blog[]>({
    queryKey: ["blogs", LIMIT_BLOG],
    queryFn: () => fetchBlogs(LIMIT_BLOG),
    staleTime: 1000 * 60 * 10,
    enabled: !cachedBlogs && LIMIT_BLOG > 0,
  });

  if (isLoading) {
    return (
      <div className="bg-[#EDF3DD] own_edge">
        <div className="main_section">
          <div className="flex flex-row justify-between  items-center mb-[32px]">
            <h2 className="uppercase">Blog</h2>
            <ButtonWithArrow title="Zobraziť celý blog" link={`/blog`} />
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="own_edge bg-[#FFEEDC]">
      <div className="main_section">
        <div className="flex flex-row justify-between  items-center mb-[32px]">
          <h2 className="uppercase">Blog</h2>
          <ButtonWithArrow title="Zobraziť celý blog" link={`/blog`} />
        </div>
        {existingBlogs && existingBlogs.length > 0 && (
          <div className="">
            <div className="flex md:flex-row gap-[24px]">
              <Link
                className={`md:w-1/2 flex flex-col  rounded-[24px]   w-full hover:scale-[1.01] duration-200 `}
                to={`/blog/${existingBlogs[0].slug}`}
              >
                {" "}
                <img
                  src={existingBlogs[0].titulna_foto}
                  className="rounded-[16px]"
                />
                <h5 className="uppercase mt-[24px]">
                  {existingBlogs[0].nazov_blog}
                </h5>
                <p className="opacity-80 ">{existingBlogs[0].popis1}</p>
              </Link>
              <div className="hidden lg:flex flex-col md:w-1/2 gap-[24px]">
                {existingBlogs &&
                  existingBlogs.slice(1, 4).map((object, index) => (
                    <Link
                      className={`flex flex-row  rounded-[24px]   w-full hover:scale-[1.01] duration-200 `}
                      key={index}
                      to={`/blog/${object.slug}`}
                    >
                      {" "}
                      <img
                        src={object.titulna_foto}
                        className="rounded-[16px] max-w-[342px]"
                      />
                      <div className="flex flex-col pl-[24px]">
                        {" "}
                        <h6 className="pt-[8px] uppercase">
                          {object.nazov_blog}
                        </h6>
                        <p className="line-clamp-4 opacity-80 pt-[8px]">
                          {object.popis1}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageBlogSection;
