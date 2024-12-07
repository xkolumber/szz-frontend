import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchAnnouncementSlug } from "../../lib/functions";
import { Oznamy } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";

const AnnPageSlug = () => {
  const queryClient = useQueryClient();
  const { slug } = useParams<{ slug: string }>();

  const cachedElements =
    queryClient.getQueryData<Oznamy[]>(["announcements"]) || [];
  const cachedElement = cachedElements.find((item) => item.slug === slug);
  const directCachedElement = queryClient.getQueryData<Oznamy>([
    "announcements",
    slug,
  ]);

  const initialElements = directCachedElement || cachedElement;

  const {
    data: elementData = initialElements,
    isLoading,

    error,
  } = useQuery<Oznamy>({
    queryKey: ["announcements", slug],
    queryFn: () => fetchAnnouncementSlug(slug!),
    enabled: !initialElements,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-[500px] relative overflow-hidden">
        <div className="main_section !pt-8 min-h-[600px]">
          <ClipLoader size={20} color={"#000000"} loading={true} />
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="own_edge min-h-[500px] relative overflow-hidden">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Späť oznamy" link={`/oznamy`} />
          <p className="pt-4">Zadaný oznam neexistuje</p>
        </div>
      </div>
    );

  return (
    <div className="own_edge relative min-h-[500px] overflow-hidden">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Späť na oznamy" link={`/oznamy`} />
        {elementData && (
          <>
            <div className="flex items-center flex-col">
              <h1 className="pt-8 pb-4">{elementData?.nazov}</h1>
              <div className="flex flex-row gap-6  ">
                <p className="font-medium">{elementData?.datum}</p>
              </div>
            </div>

            <div className="max-w-[900px] m-auto mt-8 xl:mt-[80px]">
              {elementData.text1 && (
                <div
                  className="content  "
                  dangerouslySetInnerHTML={{ __html: elementData.text1 }}
                />
              )}
              {elementData.foto && (
                <img
                  src={elementData.foto}
                  width={900}
                  height={900}
                  className="rounded-[16px] w-full max-w-[1080px] max-h-[459px] object-cover mt-8"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnnPageSlug;
