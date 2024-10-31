interface Props {
  text: string;
  element: any;
}

const ButtonWithElement = ({ text, element }: Props) => {
  return (
    <div className="btn btn--tertiary items-center gap-4">
      <p className="text-white -mb-[4px]"> {text}</p>
      {element}
    </div>
  );
};

export default ButtonWithElement;
