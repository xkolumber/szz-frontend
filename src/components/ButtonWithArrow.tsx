"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import IconArrow from "./Icons/IconArrow";

interface Props {
  title: string;
  link: string;
  bg?: string;
  color?: string;
  justifyCenterMobile?: boolean;
}

const ButtonWithArrow = ({
  title,
  link,
  bg,
  color,
  justifyCenterMobile,
}: Props) => {
  const [hoverButton, setHoverButton] = useState(false);

  return (
    <Link
      className={`flex flex-row gap-6 items-center  cursor-pointer p-8 rounded-[16px] ${
        justifyCenterMobile && "justify-center md:justify-start"
      }`}
      onMouseEnter={() => setHoverButton(true)}
      onMouseLeave={() => setHoverButton(false)}
      to={link}
      style={{ backgroundColor: bg }}
    >
      {" "}
      <p
        className="uppercase font-semibold !leading-none"
        style={{ color: color }}
      >
        {title}
      </p>
      <IconArrow ishovered={hoverButton} color={color} />
    </Link>
  );
};

export default ButtonWithArrow;
