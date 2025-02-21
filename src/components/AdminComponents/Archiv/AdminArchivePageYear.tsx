import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Archive } from "../../../lib/interface";
import StepBack from "../../StepBack";

const AdminArchivePageYear = () => {
  const [data, setData] = useState<Archive[]>([]);

  const { rok } = useParams<{ rok: string }>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/admin/archive/getarchivebyear/${rok}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <div className=" w-full">
        <StepBack />
        <h2>Archív rok: {rok}</h2>

        <Link to={`/admin/archiv/novy-dokument`}>
          <p className="underline">Pridať nový dokument</p>
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
                    {object.pdf_nazov}
                  </td>
                  <td className="flex justify-end">
                    <Link to={`/admin/archiv/${rok}/${object.id} `}>
                      <button className="btn btn--tertiary">Info</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminArchivePageYear;
