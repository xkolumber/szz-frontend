import { useNavigate } from "react-router-dom";

const StepBack = () => {
  const navigate = useNavigate();

  return (
    <p
      onClick={() => navigate(-1)}
      className="underline text-primary hover:text-fifthtiary cursor-pointer"
    >
      Späť
    </p>
  );
};

export default StepBack;
