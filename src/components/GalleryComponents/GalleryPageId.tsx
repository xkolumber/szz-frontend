import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Gallery } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";

const GalleryPageId = () => {
  const [data, setData] = useState<Gallery>();
  const [data2, setData2] = useState<Gallery[]>([]);
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [choosenAlbum, setChoosenAlbum] = useState<SlideImage[]>([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/gallery/getgalleryalbumopen/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData != null) {
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData2 = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admin/gallery/getgalleriessexcept/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData != null) {
        setData2(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
      getData2();
    }
  }, [id]);

  const handleOpenGallery = (index: number) => {
    const transformedAlbum = data!.fotky.map((url) => ({ src: url }));
    setChoosenAlbum(transformedAlbum);
    setOpen(true);
    setInitialSlide(index);
  };

  return (
    <div className="own_edge relative overflow-hidden">
      <div className="main_section ">
        {data ? (
          <>
            <div className="flex items-center flex-col">
              <h1>{data?.nazov}</h1>
              <p className="opacity-60">{data.datum}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24 mt-8">
                {data.fotky.map((object, index) => (
                  <img
                    src={object}
                    key={index}
                    className="rounded-[16px] w-full h-full object-cover cursor-pointer hover:scale-[1.02] duration-200"
                    onClick={() => handleOpenGallery(index)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-screen">
            <p>Loading...</p>
          </div>
        )}

        <div className="flex flex-row justify-between mt-[80px] items-center mb-[32px]">
          <h2 className="uppercase ">Ďalšie albumy</h2>
          <ButtonWithArrow title="Zobraziť všetky" link={`/galeria`} />
        </div>

        {data2 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {data2.map((object, index) => (
              <Link
                className={`flex flex-col  rounded-[24px] w-full max-w-[464px] hover:scale-[1.02] duration-200`}
                key={index}
                to={`/galeria/${object.id}`}
              >
                <img
                  src={object.fotky[0]}
                  className="rounded-[16px]  object-cover h-[280px]"
                />

                <h5 className="pt-[8px]">{object.nazov}</h5>
                <p className="opacity-60">{object.datum}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {open && (
          <Lightbox
            open={open}
            slides={choosenAlbum}
            close={() => setOpen(false)}
            index={initialSlide}
          />
        )}
        <img
          src={"/icons/icon_gallery_id_left.svg"}
          className="absolute h-[578px] w-[373px] -left-40 top-[40%] hidden 3xl:block"
        />
        <img
          src={"/icons/icon_gallery_id_right.svg"}
          className="absolute h-[578px] w-[373px] -right-40 top-[20%] hidden 3xl:block"
        />
      </div>
    </div>
  );
};

export default GalleryPageId;
