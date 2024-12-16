import axios from "axios";
import { useEffect, useState } from "react";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(null);

  const key = "visits";

  const namespace =
    import.meta.env.DEPLOYED_URL || "my-unique-namespace12385455564uyhkjk";

  useEffect(() => {
    const incrementVisitCount = async () => {
      console.log("hello?");
      try {
        const response = await axios.get(
          `https://api.countapi.xyz/hit/${namespace}/${key}`
        );
        console.log(response);
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
