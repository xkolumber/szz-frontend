import React from "react";
import ButtonWithArrowLeft from "./ButtonWithArrowLeft";

const GdprPage = () => {
  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">Ochrana osobných údajov</h2>
        </div>
      </div>
    </div>
  );
};

export default GdprPage;
