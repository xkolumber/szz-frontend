import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchGalleriesToken,
  fetchGalleryIdToken,
} from "../../../lib/functions";
import { Gallery } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminGalleryPageIdComponent from "./AdminGalleryPageIdComponent";

const AdminGalleryPageId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const cachedElements =
    queryClient.getQueryData<Gallery[]>(["admin_galleries"]) || [];

  const cachedElement = cachedElements.find((event) => event.id === id);
  const directCachedElement = queryClient.getQueryData<Gallery>([
    "admin_galleries",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<Gallery>({
    queryKey: ["admin_galleries", id],
    queryFn: () => fetchGalleryIdToken(token, id),
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
      queryClient.getQueryData<Gallery[]>(["admin_galleries"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Gallery>(
        ["admin_galleries", id],
        initialElementData
      );
    } else {
      const data2: Gallery[] = await queryClient.fetchQuery({
        queryKey: ["admin_galleries"],
        queryFn: () => fetchGalleriesToken(token),
      });

      const cachedElement = data2.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Gallery>(
        ["admin_galleries", id],
        initialElementData
      );
    }
  };

  return (
    <div>
      {data && (
        <AdminGalleryPageIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}

      {data == null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminGalleryPageId;
