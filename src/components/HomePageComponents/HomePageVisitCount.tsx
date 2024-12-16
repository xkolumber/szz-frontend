import axios from "axios";
import { useEffect, useState } from "react";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(null);

  const key = "visit";

  useEffect(() => {
    const incrementVisitCount = async () => {
      try {
        const response = await axios.get(
          `https://api.countapi.xyz/hit/${import.meta.env.DEPLOYED_URL}/${key}`
        );
        setVisitCount(response.data.value);
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    };

    incrementVisitCount();
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
