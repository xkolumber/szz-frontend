import { useState } from "react";
import { Link } from "react-router-dom";
import { years } from "../../../lib/functionsClient";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminArchivePage = () => {
  const [authorized] = useState("ano");
  //   const token = localStorage.getItem("token");

  const actual_year = new Date().getFullYear();

  return (
    <div>
      {authorized === "ano" && (
        <div className=" w-full">
          <StepBack />
          <h2>Archív</h2>
          <Link to={`/admin/archiv/novy-dokument`}>
            <p className="underline">Pridať nový dokument</p>
          </Link>

          <div className="flex flex-col gap-8">
            {years.map(
              (object, index) =>
                object <= actual_year && (
                  <Link
                    to={`/admin/archiv/${object}`}
                    className="underline"
                    key={index}
                  >
                    {object}
                  </Link>
                )
            )}
          </div>
        </div>
      )}

      {authorized === "nie" && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminArchivePage;
