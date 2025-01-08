import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchBlogsToken } from "../../../lib/functions";
import { Blog } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminErrorStatus from "../AdminErrorStatus";
import AdminDataSkeleton from "../AdminDataSkeleton";

const AdminBlogsPage = () => {
  const { data, status, isLoading } = useQuery<Blog[]>({
    queryKey: ["admin_blogs"],
    queryFn: () => fetchBlogsToken(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="">
        <StepBack />
        <h2>Blog sekcia</h2>
        <p>V tejto časti vytvárate články.</p>

        <Link to="/admin/blog/novy-blog">
          <p className="underline">Pridať nový blog</p>
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
          <h2>Blog sekcia</h2>
          <p>V tejto časti vytvárate články.</p>

          <Link to="/admin/blog/novy-blog">
            <p className="underline">Pridať nový blog</p>
          </Link>

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
                      {object.nazov_blog}
                    </td>
                    <td className="flex justify-end">
                      <Link to={`/admin/blog/${object.id} `}>
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

export default AdminBlogsPage;
