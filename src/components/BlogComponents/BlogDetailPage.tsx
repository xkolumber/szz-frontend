import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchBlogBySlug, fetchSimiliarBlogBySlug } from "../../lib/functions";
import { LIMIT_BLOG } from "../../lib/functionsClient";
import { Blog } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

const BlogDetailPage = () => {
  const queryClient = useQueryClient();

  const { slug } = useParams<{ slug: string }>();

  const cachedBlogs =
    queryClient.getQueryData<Blog[]>(["blogs", LIMIT_BLOG]) || [];
  const cachedBlog = cachedBlogs.find((blog) => blog.slug === slug);
  const directCachedBlog = queryClient.getQueryData<Blog>(["blogs", slug]);

  const initialBlogData = directCachedBlog || cachedBlog;

  const {
    data: blogData = initialBlogData,
    isLoading,
    error,
  } = useQuery<Blog>({
    queryKey: ["blogs", slug],
    queryFn: () => fetchBlogBySlug(slug!),
    enabled: !initialBlogData,
  });

  const { data: relatedBlogs = [] } = useQuery<Blog[]>({
    queryKey: ["relatedBlogs", slug],
    queryFn: () => fetchSimiliarBlogBySlug(slug!),
    enabled: cachedBlogs.length === 0,
    initialData: () =>
      cachedBlogs
        .filter((blog) => blog.slug !== slug)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="own_edge">
      <div className="main_section !pt-0 ">
        <ButtonWithArrowLeft title="Späť na blog" link={`/blog`} />
        {blogData && (
          <>
            <div className="flex items-center flex-col">
              <h1>{blogData?.nazov_blog}</h1>
              <div className="flex flex-row gap-6  ">
                <p className="font-medium">{blogData.datum}</p>
              </div>

              <img
                src={blogData.titulna_foto}
                width={900}
                height={900}
                className="rounded-[16px] w-full max-w-[1080px] max-h-[459px] object-cover mt-8"
              />
            </div>

            <div className="max-w-[900px] m-auto mt-[80px]">
              {blogData.popis1 && <p>{blogData.popis1}</p>}

              {blogData.foto1 && (
                <img
                  src={blogData.foto1}
                  width={900}
                  height={900}
                  className="rounded-[16px] w-full max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}
              {blogData.popis2 && <p className="mt-40">{blogData.popis2}</p>}

              {blogData.foto2 && (
                <img
                  src={blogData.foto2}
                  width={900}
                  height={900}
                  className="rounded-[16px] w-full max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}
              {blogData.popis3 && <p className="mt-40">{blogData.popis3}</p>}

              {blogData.foto2 && (
                <img
                  src={blogData.foto3}
                  width={900}
                  height={900}
                  className="rounded-[16px] w-full max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}

              {blogData.pdf.length > 0 && (
                <>
                  <h5 className="mt-[40px] uppercase">
                    Dokumenty na stiahnutie
                  </h5>
                  <div className="flex flex-wrap gap-4">
                    {" "}
                    {blogData?.pdf.map((object, index) => (
                      <Link
                        to={object.link}
                        className="btn btn--tertiary"
                        target="_blank"
                        key={index}
                      >
                        {object.nazov}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              <div className="flex flex-row justify-between opacity-60 mt-16">
                <p className="uppercase font-semibold ">
                  Publikované {blogData.datum}
                </p>
                <p className="uppercase font-semibold">Späť na začiatok </p>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-row justify-between mt-[80px] items-center mb-[32px]">
          <h2 className="uppercase ">Ďalšie články</h2>
          <ButtonWithArrow title="Zobraziť všetky" link={`/blog`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {relatedBlogs.map((object, index) => (
            <Link
              className={`flex flex-col  rounded-[24px] w-full  hover:scale-[1.02] duration-200`}
              key={index}
              to={`/blog/${object.slug}`}
            >
              <img src={object.titulna_foto} className="rounded-[16px]" />

              <h5 className="pt-[8px]">{object.nazov_blog}</h5>
              <p className="opacity-80 line-clamp-4">{object.popis1}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
