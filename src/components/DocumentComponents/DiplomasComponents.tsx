import { useState } from "react";
import { Diplomas } from "../../lib/interface";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Props {
  data: Diplomas;
}

const DiplomasComponents = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [choosenAlbum, setChoosenAlbum] = useState<SlideImage[]>([]);

  const handleOpenGallery = (index: number) => {
    const transformedAlbum = data!.fotky.map((url) => ({ src: url }));
    setChoosenAlbum(transformedAlbum);
    setOpen(true);
    setInitialSlide(index);
  };
  return (
    <>
      <h2 className="text-center uppercase pt-16 pb-4">
        Diplomy na stiahnutie
      </h2>
      <div className="flex flex-wrap gap-4">
        {data.fotky.map((object, index) => (
          <img
            className="w-60 h-60 object-cover hover:scale-[1.02] duration-200 cursor-pointer rounded-[8px]"
            src={object}
            key={index}
            onClick={() => handleOpenGallery(index)}
          />
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          slides={choosenAlbum}
          close={() => setOpen(false)}
          index={initialSlide}
        />
      )}
    </>
  );
};

export default DiplomasComponents;
