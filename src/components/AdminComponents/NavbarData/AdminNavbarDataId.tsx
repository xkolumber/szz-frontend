import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchNavbarDataIdToken,
  fetchNavbarDataToken,
} from "../../../lib/functions";
import { NavbarInfoData } from "../../../lib/interface";
import AdminNavbarDataIdComponent from "./AdminNavbarDataIdComponent";

const AdminNavbarDataId = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const cachedElements =
    queryClient.getQueryData<NavbarInfoData[]>(["admin_navbar"]) || [];

  const cachedElement = cachedElements.find((object) => object.id === id);
  const directCachedElement = queryClient.getQueryData<NavbarInfoData>([
    "admin_navbar",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<NavbarInfoData>({
    queryKey: ["admin_navbar", id],
    queryFn: () => fetchNavbarDataIdToken(id),
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
      queryClient.getQueryData<NavbarInfoData[]>(["admin_navbar"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((object) => object.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<NavbarInfoData>(
        ["admin_navbar", id],
        initialElementData
      );
    } else {
      const data2: NavbarInfoData[] = await queryClient.fetchQuery({
        queryKey: ["admin_navbar"],
        queryFn: () => fetchNavbarDataToken(),
      });

      const cachedElement = data2.find((object) => object.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<NavbarInfoData>(
        ["admin_navbar", id],
        initialElementData
      );
    }
  };

  return (
    <div>
      {data && (
        <AdminNavbarDataIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}
    </div>
  );
};

export default AdminNavbarDataId;
