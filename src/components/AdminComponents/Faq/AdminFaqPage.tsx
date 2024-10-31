import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Faq } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminFaqPage = () => {
  const [data, setData] = useState<Faq[]>([]);
  const [authorized, setAuthorized] = useState("ano");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/faq/getfaqdata`,
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
          <h2>Otázky a odpovede</h2>

          <Link to="/admin/otazky-a-odpovede/nova-otazka">
            <p className="underline">Pridať novú otázku / odpoveď</p>
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

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminFaqPage;
