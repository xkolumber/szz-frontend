import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { getUzitocneLinkyPageToken } from "../../../lib/functions";
import { GeneralPageInterface } from "../../../lib/interface";
import StepBack from "../../StepBack";

import AdminUzitocneComponent from "./AdminUzitocneComponent";

const AdminUzitocne = () => {
  const { data, status, isLoading, refetch } = useQuery<GeneralPageInterface>({
    queryKey: ["admin_uzitocne"],
    queryFn: () => getUzitocneLinkyPageToken(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className=" min-h-screen">
        <div className="main_section !pt-0">
          <StepBack />
          <Toaster />
          <h2>Užitocné linky sekcia</h2>
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
          <h2>Užitocné linky sekcia</h2>

          <AdminUzitocneComponent data={data} refetch={refetch} />
        </div>
      )}
    </div>
  );
};

export default AdminUzitocne;
