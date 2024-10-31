import { useState } from "react";
import { Faq } from "../lib/interface";
import IconToggle from "./Icons/IconToggle";

interface Props {
  homepage: boolean;
  data: Faq[];
}

const FaqElements = ({ homepage, data }: Props) => {
  const [showText, setShowText] = useState<{ [key: number]: boolean }>({
    0: true,
  });

  const toggleText = (index: number) => {
    setShowText((prevShowText) => ({
      ...prevShowText,
      [index]: !prevShowText[index],
    }));
  };

  return (
    <div>
      <div className="">
        {(homepage ? data.slice(0, 4) : data).map((question, index) => (
          <div key={index} className="toogle">
            <div
              className="flex flex-row justify-between items-center mt-4 mb-4 2xl:mt-12 2xl:mb-12"
              onClick={() => toggleText(index)}
            >
              <h6 className="font-medium max-w-[90%] md:max-w-full uppercase ">
                {question.otazka}
              </h6>
              {showText[index] ? (
                <IconToggle rotation={true} />
              ) : (
                <IconToggle />
              )}
            </div>
            {showText[index] && (
              <p
                className={`toggle_text_service opacity-80 ${
                  homepage && "line-clamp-2"
                }`}
              >
                {" "}
                {question.odpoved}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqElements;
