import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { getChildrenPageToken } from "../../../lib/functions";
import { GeneralPageInterface } from "../../../lib/interface";
import StepBack from "../../StepBack";

import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminChildrenComponent from "./AdminChildrenComponent";

const AdminChildren = () => {
  const token = localStorage.getItem("token");

  const { data, status, isLoading, refetch } = useQuery<GeneralPageInterface>({
    queryKey: ["admin_children"],
    queryFn: () => getChildrenPageToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className=" min-h-screen">
        <div className="main_section !pt-0">
          <StepBack />
          <Toaster />
          <h2>Deti a mládež sekcia</h2>
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
          <h2>Deti a mládež sekcia</h2>

          <AdminChildrenComponent data={data} refetch={refetch} />
        </div>
      )}
      {data === null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminChildren;
