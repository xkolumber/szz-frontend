"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import IconArrowLeft from "./Icons/IconArrowLeft";

interface Props {
  title: string;
  link: string;
}

const ButtonWithArrowLeft = ({ title, link }: Props) => {
  const [hoverButton, setHoverButton] = useState(false);

  return (
    <Link
      className="flex flex-row gap-6 items-center  cursor-pointer"
      onMouseEnter={() => setHoverButton(true)}
      onMouseLeave={() => setHoverButton(false)}
      to={link}
    >
      {" "}
      <IconArrowLeft ishovered={hoverButton} />
      <p className="uppercase font-semibold">{title}</p>
    </Link>
  );
};

export default ButtonWithArrowLeft;
