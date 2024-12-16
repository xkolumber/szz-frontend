import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getActualEventsYearToken } from "../../../lib/functions";
import { ActualEvent } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminEventsPageYear = () => {
  const token = localStorage.getItem("token");

  const { rok } = useParams<{ rok: string }>();

  const { data, status, isLoading } = useQuery<ActualEvent[]>({
    queryKey: ["admin_events", rok],
    queryFn: () => getActualEventsYearToken(token, rok),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Výstavy a podujatia - rok: {rok}</h2>

        <Link to="/admin/vystavy-a-podujatia/nova-udalost">
          <p className="underline">Pridať novú výstavu / podujatie</p>
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
          <h2>Výstavy a podujatia - rok: {rok}</h2>

          <Link to="/admin/vystavy-a-podujatia/nova-udalost">
            <p className="underline">Pridať novú výstavu / podujatie</p>
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
                {data.map((object, index) => (
                  <tr key={index}>
                    <td className="text-left flex items-center">
                      {object.nazov_vystavy}
                    </td>
                    <td className="flex justify-end">
                      <Link
                        to={`/admin/vystavy-a-podujatia/${object.datum_rok}/${object.id} `}
                      >
                        <button className="btn btn--tertiary">Info</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {data === null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminEventsPageYear;
