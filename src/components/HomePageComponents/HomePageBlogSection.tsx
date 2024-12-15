import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../lib/functions";
import { LIMIT_BLOG } from "../../lib/functionsClient";
import { Blog } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import HomePageBlogSkeleton from "./HomePageBlogSkeleton";

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
      <div className="own_edge relative h-auto  overflow-hidden">
        <img
          src="/bgblog.svg"
          alt="Background"
          className="absolute inset-0 w-full h-[520px] md:h-[530px] lg:h-[979px] object-cover -z-10"
        />
        <div className="main_section">
          <div className="flex flex-row justify-between  items-center mb-[32px]">
            <h2 className="uppercase">Blog</h2>
            <ButtonWithArrow title="Zobraziť celý blog" link={`/blog`} />
          </div>
          <HomePageBlogSkeleton />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="own_edge relative h-auto  overflow-hidden">
      <img
        src="/bgblog.svg"
        alt="Background"
        className="absolute inset-0 w-full h-[520px] md:h-[530px] lg:h-[979px] object-cover -z-10"
      />
      <div className="main_section">
        <div className="flex flex-row justify-center md:justify-between  items-center mb-8 md:mb-[32px]">
          <h2 className="uppercase text-center md:text-left">Blog</h2>
          <div className="hidden md:block">
            <ButtonWithArrow title="Zobraziť celý blog" link={`/blog`} />
          </div>
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
                <h5 className="uppercase mt-4">
                  {existingBlogs[0].nazov_blog}
                </h5>
                <div
                  className="content opacity-80 line-clamp-2 pt-1 "
                  dangerouslySetInnerHTML={{ __html: existingBlogs[0].popis1 }}
                />
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
                        width={280}
                        height={140}
                        src={object.titulna_foto}
                        className="rounded-[16px] w-[35%] max-h-[180px]  object-cover"
                      />
                      <div className="flex flex-col pl-[24px]">
                        {" "}
                        <h6 className="pt-[8px] uppercase line-clamp-2">
                          {object.nazov_blog}
                        </h6>
                        <div
                          className="content line-clamp-4 opacity-80 pt-[8px] "
                          dangerouslySetInnerHTML={{ __html: object.popis1 }}
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center md:hidden pt-8 mb-8">
          <ButtonWithArrow title="Zobraziť celý blog" link={`/blog`} />
        </div>
        <img
          src={"/icons/icon_blog.svg"}
          className="absolute h-[578px] w-[373px] -right-40 top-1/4 hidden 3xl:block"
        />
        <img
          src={"/icons/icon_gloves.svg"}
          className="absolute h-[248px] w-[248px] -top-16 left-[18%] hidden 2xl:block"
        />
      </div>
    </div>
  );
};

export default HomePageBlogSection;
