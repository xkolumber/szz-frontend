import { useEffect, useState } from "react";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/visit-counter`
        );
        console.log(response);
        const data = await response.json();

        setVisitCount(data.value);
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div>
      {visitCount !== null ? (
        <p>This page has been visited {visitCount} times.</p>
      ) : (
        <p>Loading visit count...</p>
      )}
    </div>
  );
};

export default VisitCounter;
