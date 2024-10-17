const NavbarInfo = () => {
  const data = ["First", "Second", "Third", "Fourth"];
  const data2 = ["LastFinal", "final"];
  return (
    <div className="flex flex-row gap-6 main_section !pt-0 !pb-0 justify-between">
      <div className="flex flex-row gap-[32px]">
        {data.map((object, index) => (
          <p className="text-white" key={index}>
            {object}
          </p>
        ))}
      </div>
      <div className="flex-row gap-[32px] hidden md:flex">
        {data2.map((object, index) => (
          <p className="text-white" key={index}>
            {object}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NavbarInfo;
