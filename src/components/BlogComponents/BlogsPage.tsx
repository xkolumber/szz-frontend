import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchBlogs } from "../../lib/functions";
import { LIMIT_BLOG } from "../../lib/functionsClient";
import { Blog } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import SeoElement from "../SeoElement";

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

  if (isLoading)
    return (
      <div className="own_edge min-h-screen relative overflow-hidden">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <h2 className="uppercase text-center pt-8 pb-4">Záhradkársky blog</h2>
          <ClipLoader size={20} color={"#000000"} loading={true} />
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <SeoElement
        title={`Záhradkársky blog`}
        description={`Vitajte na našom záhradkárskom blogu, kde nájdete tipy, triky a inšpiráciu pre vašu záhradu. Objavte užitočné rady na pestovanie rastlín, starostlivosť o záhradu a mnoho ďalších praktických informácií pre záhradkárov.`}
      />

      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="uppercase text-center pt-8 pb-4">Záhradkársky blog</h2>
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
                  width={240}
                  height={240}
                  className="rounded-[16px] w-full max-h-[280px] h-full object-cover"
                />
                <h5 className="pt-4 line-clamp-1 uppercase">
                  {object.nazov_blog}
                </h5>
                <div className="">
                  <div
                    className="content opacity-80 pt-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: object.popis1 }}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No blogs available.</p>
        )}
        <button onClick={handleLoadMore} className="mt-16 underline">
          Načítať viac blogov
        </button>
      </div>
      <img
        src={"/icons/icon_blogpage_left.svg"}
        className="absolute h-[578px] w-[373px] -left-40 top-[60%] hidden 3xl:block"
      />
      <img
        src={"/icons/icon_blogpage.svg"}
        className="absolute h-[578px] w-[373px] -right-40 top-[10%] hidden 3xl:block"
      />
    </div>
  );
};

export default BlogsPage;
