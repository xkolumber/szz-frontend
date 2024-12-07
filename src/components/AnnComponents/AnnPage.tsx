import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { fetchAnnouncements } from "../../lib/functions";
import { Oznamy } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import { useState } from "react";
import IconArrow from "../Icons/IconArrow";

const AnnPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const cachedElements = queryClient.getQueryData<Oznamy[]>(["announcements"]);

  const {
    data: existingElements = cachedElements || [],
    isLoading,
    error,
  } = useQuery<Oznamy[]>({
    queryKey: ["announcements"],
    queryFn: () => fetchAnnouncements(),
    staleTime: 1000 * 60 * 10,
    enabled: !cachedElements,
  });

  if (isLoading)
    return (
      <div className="own_edge min-h-[500px] relative overflow-hidden">
        <div className="main_section !pt-8">
          <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
          <h2 className="uppercase text-center pt-8 pb-4">Oznamy</h2>
          <ClipLoader size={20} color={"#000000"} loading={true} />
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="own_edge min-h-[500px] relative overflow-hidden">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="uppercase text-center pt-8 pb-4">Oznamy</h2>
        {existingElements && existingElements.length > 0 ? (
          <div className="flex flex-col gap-4">
            {existingElements.map((object, index) => (
              <Link
                className="flex flex-row gap-4 items-center"
                key={index}
                to={`/oznamy/${object.slug}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p className=""> {object.datum}</p>
                <p className="">|</p>
                <p className="">{object.nazov}</p>
                <IconArrow ishovered={hoveredIndex === index} color="#000000" />
              </Link>
            ))}
          </div>
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AnnPage;
