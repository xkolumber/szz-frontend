"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import IconArrow from "./Icons/IconArrow";

interface Props {
  title: string;
  link: string;
}

const ButtonWithArrow = ({ title, link }: Props) => {
  const [hoverButton, setHoverButton] = useState(false);

  return (
    <Link
      className="flex flex-row gap-6 items-center  cursor-pointer"
      onMouseEnter={() => setHoverButton(true)}
      onMouseLeave={() => setHoverButton(false)}
      to={link}
    >
      {" "}
      <p className="uppercase font-semibold">{title}</p>
      <IconArrow ishovered={hoverButton} />
    </Link>
  );
};

export default ButtonWithArrow;
