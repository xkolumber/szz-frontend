import { Link } from "react-router-dom";
import logo from "../assets/logo_white.svg";
import { navbar_data } from "../lib/functionsClient";

const Footer = () => {
  return (
    <div className="bg-[#47261C] own_edge">
      <footer className="main_section m-auto">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <img src={logo} width={150} height={150} className="" />

          <div className=" flex flex-col md:flex-row gap-4 md:gap-24 xl:gap-52 mt-12 md:mt-0">
            <div className="flex flex-col ">
              {navbar_data.map((object, index) => (
                <Link
                  className="text-white hover:text-secondary duration-300 ease-in-out mb-[24px] opacity-80"
                  to={`/slug`}
                  key={index}
                >
                  {object.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col ">
              {navbar_data.map((object, index) => (
                <Link
                  className="text-white hover:text-secondary duration-300 ease-in-out mb-[24px] opacity-80"
                  to={`/slug`}
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

              <a href="tel:+421903243393">
                <p className="text-white underline  mb-1">+421903243393</p>
              </a>
              <a href="tel:++421910211001">
                <p className="text-white underline  mb-1">+421 910 211 001</p>
              </a>
              <a href="mailto:info@energysportrent.sk?subject=Otázka">
                <p className="text-white underline  mb-1">info@szz.sk</p>
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
  );
};

export default Footer;
