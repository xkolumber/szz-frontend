import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { getContactPageToken } from "../../../lib/functions";
import { ContactPageInterface } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminContactPageComponent from "./AdminContactPageComponent";

const AdminContactPage = () => {
  const token = localStorage.getItem("token");

  const { data, status, isLoading, refetch } = useQuery<ContactPageInterface>({
    queryKey: ["admin_contact"],
    queryFn: () => getContactPageToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className=" min-h-screen">
        <div className="main_section !pt-0">
          <StepBack />
          <Toaster />
          <h2>Kontakt sekcia</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-0">
          <p>Error</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data && (
        <div className=" w-full">
          <StepBack />
          <Toaster />
          <h2>Kontakt sekcia</h2>

          <AdminContactPageComponent data={data} refetch={refetch} />
        </div>
      )}
      {data === null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminContactPage;
