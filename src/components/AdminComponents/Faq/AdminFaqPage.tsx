import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchFaqToken } from "../../../lib/functions";
import { Faq } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";

const AdminFaqPage = () => {
  const { data, status, isLoading } = useQuery<Faq[]>({
    queryKey: ["admin_faq"],
    queryFn: () => fetchFaqToken(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Otázky a odpovede</h2>

        <Link to="/admin/otazky-a-odpovede/nova-otazka">
          <p className="underline">Pridať novú otázku / odpoveď</p>
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
          <h2>Otázky a odpovede</h2>

          <Link to="/admin/otazky-a-odpovede/nova-otazka">
            <p className="underline">Pridať novú otázku / odpoveď</p>
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
                    {object.otazka}
                  </td>
                  <td className="flex justify-end">
                    <Link to={`/admin/otazky-a-odpovede/${object.id} `}>
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

export default AdminFaqPage;
