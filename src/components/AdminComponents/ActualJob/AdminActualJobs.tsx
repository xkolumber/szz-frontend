import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchActualJobsToken } from "../../../lib/functions";
import { ActualJob } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";

const AdminActualJobs = () => {
  const { data, status, isLoading } = useQuery<ActualJob[]>({
    queryKey: ["admin_jobs"],
    queryFn: () => fetchActualJobsToken(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Aktuálne práce v mesiacoch</h2>
        <p>
          V tejto časti viete upraviť popis, PDF dokument a farbu v jednotlivých
          mesiacoch.
        </p>

        <Link to="/admin/aktualne-prace/novy-mesiac">
          <p className="underline">Pridať nový mesiac</p>
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
          <h2>Aktuálne práce v mesiacoch</h2>
          <p>
            V tejto časti viete upraviť popis, PDF dokument a farbu v
            jednotlivých mesiacoch.
          </p>

          <Link to="/admin/aktualne-prace/novy-mesiac">
            <p className="underline">Pridať nový mesiac</p>
          </Link>

          <table className="admin_section_2fr mt-8">
            <thead>
              <tr className="bg-[#dedede]">
                <th className="text-left">Názov</th>
                <th className="text-right md:mr-12">Info</th>
              </tr>
            </thead>
            <tbody>
              {data.map((object, index) => (
                <tr key={index}>
                  <td className="text-left flex items-center">
                    {object.mesiac}
                  </td>
                  <td className="flex justify-end">
                    <Link to={`/admin/aktualne-prace/${object.id} `}>
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

export default AdminActualJobs;
