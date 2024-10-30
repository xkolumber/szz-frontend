import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ActualJob } from "../../lib/interface";
import StepBack from "../StepBack";
import AdminNotAuthorized from "./AdminNotAuthorized";

const AdminActualJobs = () => {
  const [data, setData] = useState<ActualJob[]>([]);
  const [authorized, setAuthorized] = useState("ano");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/actualjobs/getactualjobs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        setData(responseData.Items);
      } catch (error) {
        setAuthorized("nie");
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {data && authorized === "ano" && (
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
              <tr className="bg-tertiary">
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

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminActualJobs;
