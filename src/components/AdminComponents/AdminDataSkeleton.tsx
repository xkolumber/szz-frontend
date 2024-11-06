import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDataSkeleton = () => {
  return (
    <div className="admin_section_2fr mt-8">
      <div className="border-b border-black flex justify-between items-center">
        {" "}
        <Skeleton
          width={40}
          height={10}
          borderRadius={16}
          baseColor="#dedede"
        />
        <Skeleton
          width={30}
          height={10}
          borderRadius={16}
          baseColor="#dedede"
          className="text-right md:mr-12"
        />
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="border-b border-black flex justify-between items-center pt-2 pb-2"
        >
          <Skeleton
            width={140}
            height={10}
            borderRadius={16}
            baseColor="#dedede"
          />
          <Skeleton
            width={80}
            height={40}
            borderRadius={8}
            baseColor="#dedede"
            className="!leading-[inherit]"
          />
        </div>
      ))}
    </div>
  );
};

export default AdminDataSkeleton;
