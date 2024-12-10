import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventPagesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-8">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index}>
          <Skeleton
            width="100%"
            height={280}
            borderRadius={16}
            baseColor="#dedede"
          />
          <h5>
            <Skeleton
              width="70%"
              borderRadius={16}
              baseColor="#dedede"
              className="mt-4 mb-2"
            />
          </h5>
          <p>
            <Skeleton width="20%" borderRadius={16} baseColor="#dedede" />
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventPagesSkeleton;
