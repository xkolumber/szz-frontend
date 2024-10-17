import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const data = [
    {
      title: "Domov",
      slug: "/",
    },
    {
      title: "O nás",
      slug: "/o-nas",
    },
    {
      title: "Blog",
      slug: "/",
    },
    {
      title: "Výstavy a podujatia",
      slug: "/",
    },
    {
      title: "Archív",
      slug: "/",
    },
    {
      title: "Galéria",
      slug: "/",
    },
  ];
  return (
    <div className="own_edge navbar_stroke">
      <div className="flex flex-row items-center main_section justify-between !pt-0 !pb-0 ">
        <Link to={"/"}>
          {" "}
          <img src={logo} width={90} height={90} />
        </Link>

        <div className="flex-row gap-[64px] hidden lg:flex">
          {data.map((object, index) => (
            <Link to={object.slug} key={index}>
              {object.title}
            </Link>
          ))}
        </div>
        <SearchInput />
      </div>
    </div>
  );
};

export default Navbar;
