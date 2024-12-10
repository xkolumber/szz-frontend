import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchSpravodajciIdToken,
  fetchSpravodajciToken,
} from "../../../lib/functions";
import { Spravodajca } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminSpravodajciIdComponent from "./AdminSpravodajciIdComponent";

const AdminSpravodajciId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedElements =
    queryClient.getQueryData<Spravodajca[]>(["admin_spravodajci"]) || [];

  const cachedElement = cachedElements.find((blog) => blog.id === id);
  const directCachedElement = queryClient.getQueryData<Spravodajca>([
    "admin_spravodajci",
    id,
  ]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    isLoading,
    status,
  } = useQuery<Spravodajca>({
    queryKey: ["admin_spravodajci", id],
    queryFn: () => fetchSpravodajciIdToken(token, id),
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
      queryClient.getQueryData<Spravodajca[]>(["admin_spravodajci"]) || [];

    if (cachedElements.length > 0) {
      const cachedElement = cachedElements.find((object) => object.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Spravodajca>(
        ["admin_spravodajci", id],
        initialElementData
      );
    } else {
      const data2: Spravodajca[] = await queryClient.fetchQuery({
        queryKey: ["admin_spravodajci"],
        queryFn: () => fetchSpravodajciToken(token),
      });

      const cachedElement = data2.find((event) => event.id === id);

      const initialElementData = cachedElement;
      queryClient.setQueryData<Spravodajca>(
        ["admin_spravodajci", id],
        initialElementData
      );
    }
  };

  return (
    <div>
      {data && (
        <AdminSpravodajciIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}

      {data == null && <AdminNotAuthorized />}
    </div>
  );
};

export default AdminSpravodajciId;
