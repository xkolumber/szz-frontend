import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchNavbarDataToken } from "../../../lib/functions";
import { NavbarInfoData } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminNavbarData = () => {
  const token = localStorage.getItem("token");

  const { data, status, isLoading } = useQuery<NavbarInfoData[]>({
    queryKey: ["admin_navbar"],
    queryFn: () => fetchNavbarDataToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Hlavička odkazy</h2>
        <p>V tejto časti viete upraviť odkazy v hlavičke na hlavnej stránke.</p>

        <Link to="/admin/hlavicka-odkazy/novy-odkaz">
          <p className="underline">Pridať nový odkaz</p>
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
          <h2>Hlavička odkazy</h2>
          <p>
            V tejto časti viete upraviť odkazy v hlavičke na hlavnej stránke.
          </p>

          <Link to="/admin/hlavicka-odkazy/novy-odkaz">
            <p className="underline">Pridať nový odkaz</p>
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
                    <Link to={`/admin/hlavicka-odkazy/${object.id} `}>
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

export default AdminNavbarData;
