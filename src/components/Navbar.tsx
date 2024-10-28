import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo.svg";
import SearchInput from "./SearchInput";
import { data } from "../lib/functionsClient";

const Navbar = () => {
  let location = useLocation();

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
