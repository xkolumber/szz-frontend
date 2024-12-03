import { Link } from "react-router-dom";
import logo from "../assets/logo_white.svg";
import { footer_data, navbar_data } from "../lib/functionsClient";
import IconBgFooter from "./Icons/IconBgFooter";

const Footer = () => {
  return (
    <>
      {" "}
      <IconBgFooter />
      <div className="bg-[#47261C] own_edge flex flex-col ">
        <div className="main_section w-full m-auto !pb-0">
          <img
            src={"/footer_veg.svg"}
            width={1920}
            height={50}
            className="w-full object-contain  -mt-[250px]  2xl:-mt-[280px] hidden lg:block"
          />
          <img
            src={"/footer_veg_m.svg"}
            width={520}
            height={50}
            className="w-full object-contain -mt-[120px] md:-mt-[160px] lg:hidden md:h-[150px]"
          />
        </div>
        <footer className="main_section m-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <img src={logo} width={150} height={150} className="" />

            <div className=" flex flex-col md:flex-row gap-4 md:gap-24 xl:gap-52 mt-12 md:mt-24 lg:mt-0 justify-between w-full lg:justify-end">
              <div className="flex flex-col ">
                {navbar_data.map((object, index) => (
                  <Link
                    className="text-white hover:text-secondary duration-300 ease-in-out mb-[24px] opacity-80"
                    to={`${object.slug}`}
                    key={index}
                  >
                    {object.title}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col ">
                {footer_data.map((object, index) => (
                  <Link
                    className="text-white hover:text-secondary duration-300 ease-in-out mb-[24px] opacity-80"
                    to={`${object.slug}`}
                    key={index}
                  >
                    {object.title}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col">
                <h5 className="uppercase text-white mb-2 xl:mb-4 mt-8 md:mt-0">
                  Kontakt
                </h5>

                <a href="tel:+02/20707176">
                  <p className="text-white underline  mb-1">+02/20707176</p>
                </a>
                <a href="tel:+02/20707177">
                  <p className="text-white underline  mb-1">+02/20707177</p>
                </a>
                <a href="mailto:info@szz.eu.sk?subject=Otázka">
                  <p className="text-white underline  mb-1">info@szz.eu.sk</p>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-12 border-white border-t flex flex-col items-center  md:-mb-16 lg:-mb-20">
            <div className="flex flex-col md:flex-row gap-8 justify-between w-full items-center mt-4">
              <p className="md:w-fit text-[12px] 2xl:text-[14px] text-white uppercase opacity-80">
                © 2007-2024, Slovenský zväz záhradkárov
              </p>
              <div className="flex flex-row items-center gap-[24px]">
                <Link
                  to={"/"}
                  className="text-[12px] 2xl:text-[14px] text-primary font-light  opacity-80 text-white uppercase"
                >
                  Zásady ochrany osobných údajov
                </Link>
                <Link
                  to={"/"}
                  className="text-[12px] 2xl:text-[14px] text-primary font-light  opacity-80 text-white uppercase"
                >
                  Nastavenia cookies
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
