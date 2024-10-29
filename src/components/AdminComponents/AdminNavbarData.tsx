import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL_AMIN, NavbarInfoData } from "../../lib/interface";
import StepBack from "../StepBack";
import AdminNotAuthorized from "./AdminNotAuthorized";

const AdminNavbarData = () => {
  const [data, setData] = useState<NavbarInfoData[]>([]);
  const [authorized, setAuthorized] = useState("ano");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${API_URL_AMIN}/navbar/getnavbarinfodata`,
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

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminNavbarData;
