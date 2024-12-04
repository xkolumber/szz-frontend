import ButtonWithArrowLeft from "./ButtonWithArrowLeft";

const ChildrenPage = () => {
  return (
    <div className="own_edge min-h-screen">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="text-center">Mládež</h2>
          <p>text o mládeži</p>
        </div>
      </div>
    </div>
  );
};

export default ChildrenPage;
