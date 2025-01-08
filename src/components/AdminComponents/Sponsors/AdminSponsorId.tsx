import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchSponsorIdToken,
  fetchSponsorsToken,
} from "../../../lib/functions";
import { Sponsor } from "../../../lib/interface";
import AdminSponsorIdComponent from "./AdminSponsorIdComponent";

const AdminSponsorId = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedElements =
    queryClient.getQueryData<Sponsor[]>(["admin_sponsors"]) || [];

  const cachedElement = cachedElements.find((blog) => blog.id === id);
  const directCachedElement = queryClient.getQueryData<Sponsor>([
    "admin_sponsors",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<Sponsor>({
    queryKey: ["admin_sponsors", id],
    queryFn: () => fetchSponsorIdToken(id),
    enabled: !initialElementData,
  });

  if (isLoading) {
    return (
      <div className="own_edge min-h-screen">
        <div className="main_section !pt-0">
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

  const revalidateFunction = async () => {
    const cachedElements =
      queryClient.getQueryData<Sponsor[]>(["admin_sponsors"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Sponsor>(
        ["admin_sponsors", id],
        initialElementData
      );
    } else {
      const data2: Sponsor[] = await queryClient.fetchQuery({
        queryKey: ["admin_sponsors"],
        queryFn: () => fetchSponsorsToken(),
      });

      const cachedElement = data2.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Sponsor>(
        ["admin_sponsors", id],
        initialElementData
      );
    }
  };

  return (
    <div>
      {data && (
        <AdminSponsorIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}
    </div>
  );
};

export default AdminSponsorId;
