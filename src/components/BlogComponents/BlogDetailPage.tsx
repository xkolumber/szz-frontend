import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchBlogBySlug, fetchSimiliarBlogBySlug } from "../../lib/functions";
import {
  LIMIT_BLOG,
  replaceS3UrlsWithCloudFront,
  stripHtmlTags,
  webimages_link,
} from "../../lib/functionsClient";
import { Blog } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import SeoElement from "../SeoElement";
import BlogButtonsPdf from "./BlogButtonsPdf";

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

  if (isLoading)
    return (
      <div className="own_edge min-h-screen relative overflow-hidden">
        <div className="main_section !pt-8">
          <ClipLoader size={20} color={"#000000"} loading={true} />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="own_edge min-h-screen relative overflow-hidden">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Späť na blog" link={`/blog`} />
          <p className="pt-4">Zadaný blog neexistuje</p>
        </div>
      </div>
    );

  return (
    <div className="own_edge relative overflow-hidden">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Späť na blog" link={`/blog`} />
        {blogData && (
          <>
            <SeoElement
              slug={`blog/${blogData.slug}`}
              title={blogData.nazov_blog}
              description={stripHtmlTags(blogData.popis1)}
              image={replaceS3UrlsWithCloudFront(
                blogData.titulna_foto,
                "blogphoto"
              )}
            />

            <div className="flex items-center flex-col">
              <h1 className="pt-8 pb-4 text-center">{blogData?.nazov_blog}</h1>
              <div className="flex flex-row gap-6  ">
                <p className="font-medium">{blogData.datum}</p>
              </div>

              <img
                src={replaceS3UrlsWithCloudFront(
                  blogData.titulna_foto,
                  "blogphoto"
                )}
                width={900}
                height={900}
                className="rounded-[16px] w-full max-w-[1080px] max-h-[459px] object-cover mt-8"
              />
            </div>

            <div className="max-w-[900px] m-auto mt-8 xl:mt-[80px]">
              {blogData.popis1 && (
                <div
                  className="content  "
                  dangerouslySetInnerHTML={{ __html: blogData.popis1 }}
                />
              )}

              {blogData.foto1 && (
                <img
                  src={replaceS3UrlsWithCloudFront(blogData.foto1, "blogphoto")}
                  width={900}
                  height={900}
                  className="rounded-[16px] w-full max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}

              {blogData.popis2 && (
                <div
                  className="content mt-8 xl:mt-40 "
                  dangerouslySetInnerHTML={{ __html: blogData.popis2 }}
                />
              )}

              {blogData.foto2 && (
                <img
                  src={replaceS3UrlsWithCloudFront(blogData.foto2, "blogphoto")}
                  width={900}
                  height={900}
                  className="rounded-[16px] w-full max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}
              {blogData.popis3 && (
                <div
                  className="content mt-8 xl:mt-40 "
                  dangerouslySetInnerHTML={{ __html: blogData.popis3 }}
                />
              )}

              {blogData.foto3 && (
                <img
                  src={replaceS3UrlsWithCloudFront(blogData.foto3, "blogphoto")}
                  width={900}
                  height={900}
                  className="rounded-[16px] w-full max-w-[622px] max-h-[459px] object-cover mt-8 m-auto"
                />
              )}

              {blogData.pdf.length > 0 && blogData.pdf[0].link != "" && (
                <>
                  <h5 className="mt-[40px] uppercase">
                    Dokumenty na stiahnutie
                  </h5>
                  <BlogButtonsPdf pdf={blogData.pdf} />
                </>
              )}
              <div className="flex flex-row justify-between opacity-60 mt-4 xl:mt-16">
                <p className="uppercase font-semibold ">
                  Publikované {blogData.datum}
                </p>
                <p
                  className="uppercase font-semibold cursor-pointer"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Späť na začiatok{" "}
                </p>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col md:flex-row justify-between mt-[80px] md:items-center mb-8 md:mb-[32px]">
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
              <img
                src={replaceS3UrlsWithCloudFront(
                  object.titulna_foto,
                  "blogphoto"
                )}
                className="rounded-[16px] max-h-[280px] h-full w-full object-cover"
              />

              <h5 className="pt-[8px] line-clamp-1 uppercase">
                {object.nazov_blog}
              </h5>
              <div className="">
                <div
                  className="content opacity-80 line-clamp-2 "
                  dangerouslySetInnerHTML={{ __html: object.popis1 }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <img
        src={`${webimages_link + "icons/icon_blog_id_left.svg"}`}
        className="absolute h-[578px] w-[373px] -left-40 top-[60%] hidden 3xl:block"
      />
      <img
        src={`${webimages_link + "icons/icon_blog_id_right.svg"}`}
        className="absolute h-[578px] w-[373px] -right-40 top-[10%] hidden 3xl:block"
      />
    </div>
  );
};

export default BlogDetailPage;
