import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { getAboutUsDataToken } from "../../../lib/functions";
import { AboutUsPage } from "../../../lib/interface";
import StepBack from "../../StepBack";
import AdminAboutUsComponent from "./AdminAboutUsComponent";
import AdminNotAuthorized from "../AdminNotAuthorized";

const AdminAboutUs = () => {
  const token = localStorage.getItem("token");

  const { data, status, isLoading, refetch } = useQuery<AboutUsPage>({
    queryKey: ["admin_about_us"],
    queryFn: () => getAboutUsDataToken(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className=" min-h-screen">
        <div className="main_section !pt-0">
          <StepBack />
          <Toaster />
          <h2>O nás sekcia</h2>
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
          <h2>O nás sekcia</h2>

          <AdminAboutUsComponent data={data} refetch={refetch} />
        </div>
      )}
      {data === null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminAboutUs;
