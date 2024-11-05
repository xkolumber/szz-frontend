import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchUnionDataToken } from "../../../lib/functions";
import { UnionData } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";

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
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-0">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-0">
          <p>Error</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <h2>Zväz</h2>
          <p>V tejto časti viete upraviť všetky dokumenty zväzu.</p>

          <Link to="/admin/zvaz/novy-dokument">
            <p className="underline">Pridať novú sekciu</p>
          </Link>

          <table className="admin_section_2fr mt-8">
            <thead>
              <tr className="bg-tertiary">
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
        </div>
      )}

      {data === null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminUnionPage;
