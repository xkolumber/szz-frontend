import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAnnouncementsToken } from "../../../lib/functions";
import { Oznamy } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminAnnouncementsPage = () => {
  const token = localStorage.getItem("token");
  const { data, status, isLoading } = useQuery<Oznamy[]>({
    queryKey: ["admin_announcements"],
    queryFn: () => fetchAnnouncementsToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Oznamy</h2>

        <Link to="/admin/oznamy/novy-oznam">
          <p className="underline">Pridať nový oznam</p>
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
          <h2>Oznamy</h2>

          <Link to="/admin/oznamy/novy-oznam">
            <p className="underline">Pridať nový oznam</p>
          </Link>

          <table className="admin_section_2fr mt-8">
            <thead>
              <tr className="bg-tertiary">
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
                    <Link to={`/admin/oznamy/${object.id} `}>
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

export default AdminAnnouncementsPage;