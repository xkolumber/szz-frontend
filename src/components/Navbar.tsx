import { Link, useLocation } from "react-router-dom";

import { useState } from "react";
import logo from "../assets/logo.svg";
import { navbar_data } from "../lib/functionsClient";
import IconCloseNavbarButton from "./Icons/IconCloseNavbarButton";
import IconHamburger from "./Icons/IconHamburger";
import SearchInput from "./SearchInput";
import { useNavbar } from "./Provider";

const Navbar = () => {
  const { navbarZIndex } = useNavbar();

  let location = useLocation();
  const [closeClicked, setCloseClicked] = useState(false);

  const clickedButtonClose = () => {
    setCloseClicked(!closeClicked);
  };

  return (
    <div
      className="own_edge navbar_stroke bg-white sticky top-0 "
      style={{ zIndex: navbarZIndex }}
    >
      <div className="flex flex-row items-center main_section justify-between !pt-0 !pb-0 ">
        <Link to={"/"}>
          {" "}
          <img src={logo} width={90} height={90} />
        </Link>

        <div className="flex-row gap-[32px] xl:gap-[64px] hidden lg:flex items-center">
          {navbar_data.map((object, index) => (
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
        <div className="flex flex-row gap-6 items-center">
          <div className="w-full max-w-[300px] hidden md:block">
            <SearchInput />
          </div>

          <div
            className={`lg:hidden cursor-pointer ${closeClicked && "hidden"} `}
            onClick={() => clickedButtonClose()}
          >
            <IconHamburger />
          </div>
        </div>

        {closeClicked && <div className="behind_card_background"></div>}
        <div
          className={`collapsible--expanded ${
            closeClicked ? "collapsible--collapsed" : ""
          }  `}
        >
          <span className="nav__item">
            <div
              className={`icon icon--white nav__close-button `}
              onClick={() => clickedButtonClose()}
            >
              <IconCloseNavbarButton />
            </div>
          </span>

          <div className="flex flex-col justify-end items-end">
            {navbar_data.map((object, index) => (
              <Link
                to={`${object.slug === "/domov" ? "/" : `${object.slug} `}`}
                className={`nav__item ${
                  location.pathname.startsWith(object.slug) && "text-secondary"
                } ${
                  location.pathname === "/" &&
                  object.slug === "/domov" &&
                  "text-secondary"
                } `}
                key={index}
                onClick={() => clickedButtonClose()}
              >
                {object.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
