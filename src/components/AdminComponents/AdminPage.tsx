import { useEffect, useState } from "react";
import AdminNotAuthorized from "./AdminNotAuthorized";

const AdminPage = () => {
  const [data, setData] = useState("");
  const [authorized, setAuthorized] = useState("ano");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/data`,
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

        setData(responseData.message);
      } catch (error) {
        setAuthorized("nie");
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="own_edge">
      <div className="main_section !pt-0">
        <h2>Admin Page</h2>
        {data && authorized === "ano" && (
          <div>
            <p>{data}</p>
          </div>
        )}

        {authorized === "nie" && <AdminNotAuthorized />}
      </div>
    </div>
  );
};

export default AdminPage;
