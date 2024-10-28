import IconNotAuthorized from "../Icons/IconNotAuthorized";
import LoginElement from "../LoginElement";

const AdminNotAuthorized = () => {
  return (
    <div className="min-h-[400px] justify-center items-center flex  flex-col main_section additioanl_padding">
      <IconNotAuthorized />
      <h2 className="text-center">Na túto sekciu nemáte oprávnenie.</h2>
      <p className="text-center">
        Zdá sa, že na túto stránku nemáte oprávnenie.
      </p>
      <LoginElement />
    </div>
  );
};

export default AdminNotAuthorized;
