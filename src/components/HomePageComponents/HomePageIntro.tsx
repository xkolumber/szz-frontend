import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ButtonWithArrow from "../ButtonWithArrow";
import IconApples from "../Icons/IconApples";
import IconBird from "../Icons/IconBird";
import IconBirdWithoutEye from "../Icons/IconBirdWithoutEye";
import IconProtection from "../Icons/IconProtection";
import IconRadio from "../Icons/IconRadio";
import IconChildren from "../Icons/IconChildren";

const texts = [
  {
    text: "kde príroda ožíva.",
    obrazok: "/muz_zena.svg",
  },
  {
    text: "ktoré milujeme.",
    obrazok: "muz.svg",
  },
];

const HomePageIntro = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [radioClicked, setRadioClicked] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsFading(false);
      }, 200);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setRadioClicked(false);
      }
    };

    if (radioClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [radioClicked]);

  return (
    <div className="own_edge relative homepage">
      <div className="main_section  flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="uppercase max-w-[680px] text-center lg:text-left">
            <span className="relative">
              <span
                className={`${
                  currentTextIndex === 0 ? "text-[#77A75D]" : ""
                } duration-300 ${isFading ? "opacity-20" : "opacity-100"}`}
              >
                Záhradka
              </span>

              <IconBird />
              <IconBirdWithoutEye />
            </span>{" "}
            je miesto,
            <span
              className={`uppercase lg:hidden max-w-[680px] text-center md:text-left  duration-300 ${
                isFading ? "opacity-20" : "opacity-100"
              }`}
            >
              {" "}
              {texts[currentTextIndex].text}
            </span>
          </h1>
          <h1
            className={`hidden lg:block uppercase max-w-[680px] text-center md:text-left  duration-300 ${
              isFading ? "opacity-20" : "opacity-100"
            }`}
          >
            {texts[currentTextIndex].text}
          </h1>

          <img
            src={texts[currentTextIndex].obrazok}
            width={183}
            height={183}
            className={`lg:hidden duration-300 object-contain h-[180px] w-full ${
              isFading ? "opacity-20" : "opacity-100"
            }`}
          />

          <p className="max-w-[400px] opacity-80 text-center lg:text-left pt-4">
            Vitajte na stránkach Slovenského zväzu záhradkárov.
          </p>
          <div className="flex flex-row gap-24 md:gap-16 mt-4 md:justify-center lg:justify-start">
            <ButtonWithArrow
              link="o-nas"
              title="Kto sme"
              bg="#6B9156"
              color="#ffffff"
              padding={true}
            />
            {/* <div className="flex flex-row items-center gap-4">
              <p className="uppercase font-bold hover:underline cursor-pointer">
                Čo robíme
              </p>
              <IconScissors />
            </div> */}
          </div>
        </div>
        <div className="flex flex-col lg:w-[50%]">
          <Link
            className="bg-[#3F8124] mt-8 lg:mt-0 p-8 xl:pl-[64px] xl:pt-[37.5px] xl:pb-[37.5px] xl:pr-[40px] rounded-[24px] flex flex-col md:flex-row gap-4 md:gap-16  items-center justify-between"
            to={"/zvaz"}
          >
            <h3 className="uppercase text-white">Sekcia pre zväz</h3>
            <div className="w-full md:w-auto">
              {" "}
              <ButtonWithArrow
                link="zvaz"
                title="Klik sem"
                bg="#ffffff"
                color="#47261C"
                justifyCenterMobile={true}
                padding={true}
              />
            </div>
          </Link>
          <div className="flex flex-row mt-8 items-center0 gap-8">
            <IconApples />
            <div className="flex flex-col opacity-80 justify-center">
              <p className="text-[#47261C]">
                Staňte sa vetvou v našom záhradkárskom rodokmeni.
              </p>
              <p className="font-bold text-[#47261C]">Tešíme sa na Vás!</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row  gap-8 md:gap-0 mt-16 justify-between">
            <Link className="flex flex-row" to={"/aktuality"}>
              <div className="flex flex-row gap-[16px]">
                <div className="">
                  <div className="bg-[#739C65] w-24 h-24 flex items-center justify-center rounded-[8px]">
                    <IconProtection />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h6 className="uppercase">Ochrana rastlín</h6>
                  <p>Aktuality</p>
                </div>
              </div>
            </Link>
            <Link className="flex flex-row gap-[16px]" to={"/mladez"}>
              <div className="">
                <div className="bg-[#739C65] w-24 h-24 flex items-center justify-center rounded-[8px]">
                  <IconChildren />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h6 className="uppercase">Deti a mládež</h6>
                <p>Aktivity</p>
              </div>
            </Link>
            <div
              className="flex flex-row  mb-12 md:mb-0 gap-[16px] cursor-pointer"
              onClick={() => setRadioClicked(true)}
            >
              <div className="">
                <div className="bg-[#739C65] w-24 h-24 flex items-center justify-center rounded-[8px]">
                  <IconRadio />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h6 className="uppercase">Rozhlasové relácie</h6>
                <p>Pre záhradkárov</p>
              </div>

              {radioClicked && (
                <>
                  <div className="behind_card_background"></div>

                  <div
                    className="absolute  mt-2 flex flex-col bg-white drop-shadow-md rounded-[16px] w-[300px] z-[3100]"
                    ref={popupRef}
                  >
                    <div
                      className={`flex flex-col gap-[1.7rem] hover:bg-[#EBEBEB] hover:rounded-t-[16px] p-4 cursor-pointer`}
                    >
                      <Link
                        to={"https://www.medzinamizahradkarmi.sk"}
                        className="font-medium text-[16px] "
                      >
                        MEDZI NAMI ZÁHRADKÁRMI
                      </Link>
                    </div>

                    <div
                      className={`flex flex-col gap-[1.7rem] hover:bg-[#EBEBEB]   p-4 cursor-pointer`}
                    >
                      <Link
                        to={"https://regina.rtvs.sk"}
                        className="font-medium text-[16px]"
                      >
                        RÁDIO REGINA
                      </Link>
                    </div>

                    <div
                      className={`flex flex-col gap-[1.7rem] hover:bg-[#EBEBEB] hover:rounded-b-[16px]  p-4 cursor-pointer`}
                    >
                      <Link
                        to={"https://zahradkar.pluska.sk/r/podcast"}
                        className="font-medium text-[16px]"
                      >
                        ZÁHRADKÁR
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <img
          src={texts[currentTextIndex].obrazok}
          width={500}
          height={500}
          className={`hidden lg:block absolute -bottom-28 left-[20%] 3xl:left-[27%] z-[5]  duration-300 ${
            isFading ? "opacity-20" : "opacity-100"
          }`}
        />
      </div>
      {/* <SmoothCorner>
    <h3 className="uppercase">Sekcia pre zväz</h3>
    <button className="btn btn--green">Otvoriť</button>
  </SmoothCorner> */}
    </div>
  );
};

export default HomePageIntro;
