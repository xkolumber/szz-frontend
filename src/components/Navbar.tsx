import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import logo from "../assets/logo_green.svg";
import { navbar_data } from "../lib/functionsClient";
import IconCloseNavbarButton from "./Icons/IconCloseNavbarButton";
import IconHamburger from "./Icons/IconHamburger";
import SearchInput from "./SearchInput";
import { useNavbar } from "./Provider";
import { fetchNavbarData } from "../lib/functions";
import { useQuery } from "@tanstack/react-query";
import { NavbarInfoData } from "../lib/interface";

const Navbar = () => {
  const { navbarZIndex } = useNavbar();

  const location = useLocation();
  const [closeClicked, setCloseClicked] = useState(false);

  const clickedButtonClose = () => {
    setCloseClicked(!closeClicked);
  };

  const { data } = useQuery({
    queryKey: ["navbar_info"],
    queryFn: fetchNavbarData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const sortedData: NavbarInfoData[] = data
    ? data.sort((a: any, b: any) => a.poradie - b.poradie)
    : [];

  useEffect(() => {
    if (closeClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [closeClicked]);

  return (
    <div
      className="own_edge navbar_stroke bg-white sticky top-0 "
      style={{ zIndex: navbarZIndex }}
    >
      <div className="flex flex-row items-center main_section justify-between !pt-0 !pb-0 ">
        <Link to={"/"}>
          {" "}
          <img
            src={logo}
            width={90}
            height={90}
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </Link>

        <div className="flex-row gap-[8px] xl:gap-[16px] justify-between hidden xl:flex items-center">
          {navbar_data.map((object, index) => (
            <Link
              to={object.slug === "/domov" ? "/" : object.slug}
              key={index}
              className={`${
                location.pathname.includes(object.slug) ||
                (object.slug === "/domov" && location.pathname === "/")
                  ? "active_navbar"
                  : "item_navbar"
              }`}
            >
              {object.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-6 items-center">
          <div className="w-full max-w-[300px] hidden xl:block">
            <SearchInput />
          </div>

          <div
            className={`xl:hidden cursor-pointer ${closeClicked && "hidden"} `}
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
          <div className="flex flex-row justify-between items-center w-full pl-8 pr-8 pt-4">
            <Link to={"/"}>
              {" "}
              <img
                src={logo}
                width={60}
                height={60}
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </Link>

            <div
              className={`icon icon--white nav__close-button  `}
              onClick={() => clickedButtonClose()}
            >
              <IconCloseNavbarButton />
            </div>
          </div>

          <div className="w-full p-8 !pt-6 !pb-6">
            <SearchInput />
          </div>

          <div className="flex flex-col justify-end items-start w-full">
            {navbar_data.map((object, index) => (
              <Link
                to={`${object.slug === "/domov" ? "/" : `${object.slug} `}`}
                className={`nav__item ${
                  location.pathname.startsWith(object.slug) &&
                  "bg-tertiary !text-white"
                } ${
                  location.pathname === "/" &&
                  object.slug === "/domov" &&
                  "bg-tertiary !text-white"
                } `}
                key={index}
                onClick={() => clickedButtonClose()}
              >
                {object.title}
              </Link>
            ))}
          </div>
          <div className="border-t border-black w-full">
            <div className="grid grid-cols-2 gap-4 p-8">
              {sortedData.map((object, index) => (
                <Link
                  className="line-clamp-1 underline"
                  key={index}
                  to={object.link}
                  target={object.typ === "link" ? "_self" : "_blank"}
                  onClick={() => clickedButtonClose()}
                  rel="noopener noreferrer"
                >
                  {object.nazov}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
