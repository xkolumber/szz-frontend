import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePageBlogSkeleton = () => {
  return (
    <>
      <div className="">
        <div className="flex md:flex-row gap-[24px]">
          <div
            className={`md:w-1/2 flex flex-col  rounded-[24px]   w-full hover:scale-[1.01] duration-200 `}
          >
            {" "}
            <Skeleton
              width="100%"
              borderRadius={16}
              baseColor="#dedede"
              className="h-[200px] md:h-[400px]"
            />
            <h5 className="uppercase mt-4">
              <Skeleton width="70%" borderRadius={16} baseColor="#dedede" />
            </h5>
            <p>
              <Skeleton
                width="100%"
                borderRadius={16}
                baseColor="#dedede"
                count={2}
              />
            </p>
          </div>
          <div className="hidden lg:flex flex-col md:w-1/2 gap-[24px]">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index}>
                <div
                  className={`flex flex-row  rounded-[24px]   w-full hover:scale-[1.01] duration-200 `}
                >
                  {" "}
                  <div className="max-w-[342px] w-full">
                    <Skeleton
                      width="100%"
                      height={180}
                      borderRadius={16}
                      baseColor="#dedede"
                    />
                  </div>
                  <div className="flex flex-col pl-[24px] w-full">
                    {" "}
                    <h6 className="pt-[8px]">
                      <Skeleton
                        width="100%"
                        borderRadius={16}
                        baseColor="#dedede"
                      />
                    </h6>
                    <p className="pt-[8px]">
                      <Skeleton
                        width="100%"
                        borderRadius={16}
                        baseColor="#dedede"
                        count={4}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageBlogSkeleton;
