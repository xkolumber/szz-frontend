import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventPagesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
      <Skeleton
        width="100%"
        height={280}
        borderRadius={16}
        baseColor="#dedede"
      />
      <Skeleton
        width="100%"
        height={280}
        borderRadius={16}
        baseColor="#dedede"
      />
      <Skeleton
        width="100%"
        height={280}
        borderRadius={16}
        baseColor="#dedede"
      />
      <Skeleton
        width="100%"
        height={280}
        borderRadius={16}
        baseColor="#dedede"
      />
      <Skeleton
        width="100%"
        height={280}
        borderRadius={16}
        baseColor="#dedede"
      />
      <Skeleton
        width="100%"
        height={280}
        borderRadius={16}
        baseColor="#dedede"
      />
    </div>
  );
};

export default EventPagesSkeleton;
