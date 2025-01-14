import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchGalleriesYearToken } from "../../../lib/functions";
import { Gallery } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";

const AdminGalleryPageYear = () => {
  const { rok } = useParams<{ rok: string }>();

  const { data, status, isLoading } = useQuery<Gallery[]>({
    queryKey: ["admin_galleries", rok],
    queryFn: () => fetchGalleriesYearToken(rok),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Galéria</h2>

        <Link to="/admin/galeria/novy-album">
          <p className="underline">Pridať novú galériu</p>
        </Link>
        <AdminDataSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return <AdminErrorStatus />;
  }

  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <h2>Galéria</h2>

          <Link to="/admin/galeria/novy-album">
            <p className="underline">Pridať novú galériu</p>
          </Link>

          <h6 className="mt-8 underline">Rok: {rok}</h6>

          <table className="admin_section_2fr mt-8">
            <thead>
              <tr className="bg_table_admin">
                <th className="text-left">Názov</th>
                <th className="text-right md:mr-12">Info</th>
              </tr>
            </thead>
            <tbody>
              {data.map((object, index) => (
                <tr key={index}>
                  <td className="text-left flex items-center">
                    {object.nazov}
                  </td>
                  <td className="flex justify-end">
                    <Link to={`/admin/galeria/${rok}/${object.id} `}>
                      <button className="btn btn--tertiary">Info</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryPageYear;
