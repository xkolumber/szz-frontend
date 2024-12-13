import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchSponsorsToken } from "../../../lib/functions";
import { Sponsor } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminSponsors = () => {
  const token = localStorage.getItem("token");
  const { data, status, isLoading } = useQuery<Sponsor[]>({
    queryKey: ["admin_sponsors"],
    queryFn: () => fetchSponsorsToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Sponzori</h2>

        <Link to="/admin/sponzori/novy-sponzor">
          <p className="underline">Pridať nového sponzora</p>
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
          <h2>Sponzori</h2>

          <Link to="/admin/sponzori/novy-sponzor">
            <p className="underline">Pridať nového sponzora</p>
          </Link>

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
                    <Link to={`/admin/sponzori/${object.id} `}>
                      <button className="btn btn--tertiary">Info</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data === null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminSponsors;
