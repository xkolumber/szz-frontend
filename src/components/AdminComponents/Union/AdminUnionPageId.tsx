import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchUnionDataIdToken,
  fetchUnionDataToken,
} from "../../../lib/functions";
import { UnionData } from "../../../lib/interface";
import AdminNotAuthorized from "../AdminNotAuthorized";
import AdminUnionPageIdComponent from "./AdminUnionPageIdComponent";

const AdminUnionPageId = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const cachedUnionData =
    queryClient.getQueryData<UnionData[]>(["admin_union"]) || [];

  const cachedUnion = cachedUnionData.find((blog) => blog.id === id);
  const directCachedUnion = queryClient.getQueryData<UnionData>([
    "admin_union",
    id,
  ]);

  const initialUnionData = directCachedUnion || cachedUnion;

  const {
    data = initialUnionData,
    isLoading,
    status,
  } = useQuery<UnionData>({
    queryKey: ["admin_union", id],
    queryFn: () => fetchUnionDataIdToken(token, id),
    enabled: !initialUnionData,
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
    const cachedUnions =
      queryClient.getQueryData<UnionData[]>(["admin_union"]) || [];

    if (cachedUnions.length > 0) {
      const cachedEvent = cachedUnions.find((event) => event.id === id);

      const initialUnionData = cachedEvent;
      queryClient.setQueryData<UnionData>(
        ["admin_union", id],
        initialUnionData
      );
    } else {
      const data2: UnionData[] = await queryClient.fetchQuery({
        queryKey: ["admin_union"],
        queryFn: () => fetchUnionDataToken(token),
      });

      const cachedEvent = data2.find((event) => event.id === id);

      const initialUnionData = cachedEvent;
      queryClient.setQueryData<UnionData>(
        ["admin_union", id],
        initialUnionData
      );
    }
  };

  return (
    <>
      {data && (
        <AdminUnionPageIdComponent
          data={data}
          onDataUpdated={revalidateFunction}
        />
      )}{" "}
      {data === null && <AdminNotAuthorized />}
    </>
  );
};

export default AdminUnionPageId;
