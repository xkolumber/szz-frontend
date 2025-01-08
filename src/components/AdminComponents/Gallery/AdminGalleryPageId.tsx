import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchGalleriesYearToken,
  fetchGalleryIdToken,
} from "../../../lib/functions";
import { Gallery } from "../../../lib/interface";
import AdminGalleryPageIdComponent from "./AdminGalleryPageIdComponent";

const AdminGalleryPageId = () => {
  const queryClient = useQueryClient();
  const { rok } = useParams<{ rok: string }>();
  const { id } = useParams<{ id: string }>();

  const cachedElements =
    queryClient.getQueryData<Gallery[]>(["admin_galleries", rok]) || [];

  const cachedElement = cachedElements.find((object) => object.id === id);
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
    queryFn: () => fetchGalleryIdToken(id),
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
      queryClient.getQueryData<Gallery[]>(["admin_galleries", rok]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((object) => object.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Gallery>(
        ["admin_galleries", id],
        initialElementData
      );
    } else {
      const data2: Gallery[] = await queryClient.fetchQuery({
        queryKey: ["admin_galleries", rok],
        queryFn: () => fetchGalleriesYearToken(rok),
      });

      const cachedElement = data2.find((object) => object.id === id);

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

      {data === undefined && <p>Neexistuje album</p>}
    </div>
  );
};

export default AdminGalleryPageId;
