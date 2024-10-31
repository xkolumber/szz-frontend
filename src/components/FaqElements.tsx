import { useState } from "react";
import { questions } from "../lib/functionsClient";
import IconToggle from "./Icons/IconToggle";

interface Props {
  homepage: boolean;
}

const FaqElements = ({ homepage }: Props) => {
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
        {(homepage ? questions.slice(0, 4) : questions).map(
          (question, index) => (
            <div key={index} className="toogle">
              <div
                className="flex flex-row justify-between items-center mt-4 mb-4 2xl:mt-12 2xl:mb-12"
                onClick={() => toggleText(index)}
              >
                <h6 className="font-medium max-w-[90%] md:max-w-full uppercase ">
                  {question.title}
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
                  {question.text}
                </p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FaqElements;
