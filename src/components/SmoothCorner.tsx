// @ts-nocheck
import React from "react";
import { SmoothCorners, SmoothCornersWrapper } from "react-smooth-corners";

const SmoothCorner = ({ children }) => {
  return (
    <SmoothCornersWrapper
      corners="5"
      borderRadius="24px"
      style={{
        padding: "37.5px 40px 37.5px 64px", // Matching your original padding
        background: "#EDF3DD", // Background color
        display: "flex", // Flex layout
        flexDirection: "row", // Row layout
        gap: "16px", // Gap between children
        alignItems: "center", // Align items in the center
      }}
    >
      <SmoothCorners
        corners="5"
        borderRadius="24px"
        style={{ flex: "1", flexD }} // Ensure it takes space properly
      >
        <h3 className="uppercase">Sekcia pre zväz</h3>
        <button className="btn btn--green">Otvoriť</button>
      </SmoothCorners>
    </SmoothCornersWrapper>
  );
};

export default SmoothCorner;
