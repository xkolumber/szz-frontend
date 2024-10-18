import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo.svg";
import SearchInput from "./SearchInput";

const Navbar = () => {
  let location = useLocation();
  const data = [
    {
      title: "Domov",
      slug: "/domov",
    },
    {
      title: "O nás",
      slug: "/o-nas",
    },
    {
      title: "Blog",
      slug: "/blog",
    },
    {
      title: "Výstavy a podujatia",
      slug: "/vystavy-a-podujatia",
    },
    {
      title: "Archív",
      slug: "/archiv",
    },
    {
      title: "Galéria",
      slug: "/galeria",
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
            <Link
              to={object.slug === "/domov" ? "/" : object.slug}
              key={index}
              className={`${
                location.pathname.includes(object.slug) ? "active_navbar" : ""
              }`}
            >
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
