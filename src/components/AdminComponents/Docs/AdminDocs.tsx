import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchDiplomasToken, fetchDocsToken } from "../../../lib/functions";
import { Diplomas, Tlacivo } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminDataSkeleton from "../AdminDataSkeleton";
import AdminErrorStatus from "../AdminErrorStatus";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminDiplomas from "./AdminDiplomas";

const AdminDocs = () => {
  const token = localStorage.getItem("token");
  const { data, status, isLoading } = useQuery<Tlacivo[]>({
    queryKey: ["admin_docs"],
    queryFn: () => fetchDocsToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const {
    data: data2,
    isLoading: isLoading2,
    refetch,
  } = useQuery<Diplomas>({
    queryKey: ["admin_diplomas"],
    queryFn: () => fetchDiplomasToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Tlačivá</h2>

        <Link to="/admin/tlaciva/nove-tlacivo">
          <p className="underline">Pridať nové tlačivo</p>
        </Link>
        <AdminDataSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return <AdminErrorStatus />;
  }

  if (isLoading2) {
    return <p>loading...</p>;
  }

  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <h2>Tlačivá</h2>

          <Link to="/admin/tlaciva/nove-tlacivo">
            <p className="underline">Pridať nové tlačivo</p>
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
                    <Link to={`/admin/tlaciva/${object.id} `}>
                      <button className="btn btn--tertiary">Info</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data2 && (
        <>
          <h2 className="pt-24">Diplomy</h2>
          <AdminDiplomas data={data2} refetch={refetch} />
        </>
      )}

      {data === null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminDocs;
