import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchUnionDataToken } from "../../../lib/functions";
import { UnionData } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";

const AdminUnionPage = () => {
  const token = localStorage.getItem("token");

  const { data, status, isLoading } = useQuery<UnionData[]>({
    queryKey: ["admin_union"],
    queryFn: () => fetchUnionDataToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Zväz</h2>
        <p>V tejto časti viete upraviť všetky dokumenty zväzu.</p>
        <Link to="/admin/zvaz/novy-dokument">
          <p className="underline">Pridať novú sekciu</p>
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
      <div className=" w-full">
        <StepBack />
        <h2>Zväz</h2>
        <p>V tejto časti viete upraviť všetky dokumenty zväzu.</p>

        <Link to="/admin/zvaz/novy-dokument">
          <p className="underline">Pridať novú sekciu</p>
        </Link>
        {data && (
          <table className="admin_section_2fr mt-8">
            <thead>
              <tr className="bg_table_admin">
                <th className="text-left">Názov</th>
                <th className="text-right md:mr-12">Info</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((object, index) => (
                  <tr key={index}>
                    <td className="text-left flex items-center">
                      {object.nazov}
                    </td>
                    <td className="flex justify-end">
                      <Link to={`/admin/zvaz/${object.id} `}>
                        <button className="btn btn--tertiary">Info</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {data === null && <AdminNotAuthorized />}
      </div>
    </div>
  );
};

export default AdminUnionPage;
