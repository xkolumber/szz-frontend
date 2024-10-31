import { useQuery } from "@tanstack/react-query";
import { getAboutUsData } from "../lib/functions";

const AboutUs = () => {
  const { data, status, error, isLoading } = useQuery({
    queryKey: ["about_us"],
    queryFn: getAboutUsData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
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
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="own_edge min-h-screen">
      <div className="main_section !pt-0">
        <h2>O nás</h2>
        {data ? (
          <div>
            <p>{data}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
