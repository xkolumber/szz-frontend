import { useState } from "react";
import { Link } from "react-router-dom";
import IconArrow from "./Icons/IconArrow";

interface Props {
  title: string;
  link: string;
  bg?: string;
  color?: string;
  justifyCenterMobile?: boolean;
  padding?: boolean;
  widthFull?: boolean;
}

const ButtonWithArrow = ({
  title,
  link,
  bg,
  color,
  justifyCenterMobile = false,
  padding = false,
  widthFull = false,
}: Props) => {
  const [hoverButton, setHoverButton] = useState(false);

  return (
    <Link
      className={`flex flex-row gap-6 items-center cursor-pointer rounded-[16px]
      ${padding ? "p-8" : ""}
      ${justifyCenterMobile ? "justify-center md:justify-start" : ""}
      ${widthFull ? "w-full md:w-fit" : ""}
      `}
      onMouseEnter={() => setHoverButton(true)}
      onMouseLeave={() => setHoverButton(false)}
      to={link}
      style={{ backgroundColor: bg }}
    >
      <p className="uppercase font-semibold !leading-none" style={{ color }}>
        {title}
      </p>
      <IconArrow ishovered={hoverButton} color={color} />
    </Link>
  );
};

export default ButtonWithArrow;
