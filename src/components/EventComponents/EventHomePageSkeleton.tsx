import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventHomePageSkeleton = () => {
  return (
    <>
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 hidden md:grid">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index}>
            <Skeleton
              width="100%"
              height={280}
              borderRadius={16}
              baseColor="#dedede"
            />
            <p>
              <Skeleton
                width="30%"
                borderRadius={16}
                baseColor="#dedede"
                className="mt-8"
              />
            </p>
            <h5>
              <Skeleton
                width="70%"
                borderRadius={16}
                baseColor="#dedede"
                className="mt-4"
              />
            </h5>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:hidden">
        {Array.from({ length: 1 }, (_, index) => (
          <div key={index}>
            <Skeleton
              width="100%"
              height={280}
              borderRadius={16}
              baseColor="#dedede"
            />
            <p>
              <Skeleton
                width="30%"
                borderRadius={16}
                baseColor="#dedede"
                className="mt-8"
              />
            </p>
            <h5>
              <Skeleton
                width="70%"
                borderRadius={16}
                baseColor="#dedede"
                className="mt-4"
              />
            </h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventHomePageSkeleton;
