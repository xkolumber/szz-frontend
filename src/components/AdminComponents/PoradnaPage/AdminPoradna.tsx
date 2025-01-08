import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { getPoradnaPageToken } from "../../../lib/functions";
import { GeneralPageInterface } from "../../../lib/interface";
import StepBack from "../../StepBack";

import AdminPoradnaComponent from "./AdminPoradnaComponent";

const AdminPoradna = () => {
  const { data, status, isLoading, refetch } = useQuery<GeneralPageInterface>({
    queryKey: ["admin_poradna"],
    queryFn: () => getPoradnaPageToken(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className=" min-h-screen">
        <div className="main_section !pt-0">
          <StepBack />
          <Toaster />
          <h2>Poradňe</h2>
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
          <h2>Poradne</h2>

          <AdminPoradnaComponent data={data} refetch={refetch} />
        </div>
      )}
    </div>
  );
};

export default AdminPoradna;
