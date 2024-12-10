import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Gallery } from "../../lib/interface";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import YouTubeVideo from "../YoutubeVideo";

const GalleryPageId = () => {
  const [data, setData] = useState<Gallery>();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [choosenAlbum, setChoosenAlbum] = useState<SlideImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const handleOpenGallery = (index: number) => {
    const transformedAlbum = data!.fotky.map((url) => ({ src: url }));
    setChoosenAlbum(transformedAlbum);
    setOpen(true);
    setInitialSlide(index);
  };

  return (
    <div className="own_edge relative overflow-hidden min-h-screen">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Späť do galérie" link={`/galeria`} />

        {!isLoading && data ? (
          <>
            <div className="flex flex-col">
              <h1 className="text-center">{data?.nazov}</h1>
              <p className="opacity-60 text-center">{data?.datum}</p>
              {data?.link_album && data.link_album.includes("watch?v=") && (
                <div className="youtube_video">
                  <YouTubeVideo url={data.link_album} />
                </div>
              )}
              {data?.link_album && !data.link_album.includes("watch?v=") && (
                <div className="flex flex-row gap-4">
                  {" "}
                  <p>Link galérie:</p>{" "}
                  <Link
                    to={data.link_album}
                    target="_blank"
                    className="underline"
                  >
                    {data.link_album}
                  </Link>{" "}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 w-full">
                {data?.fotky.map((object, index) => (
                  <div key={index} className="relative w-full h-[280px]">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[16px]"></div>
                    <img
                      src={object}
                      alt={`Gallery item ${index}`}
                      className="rounded-[16px] w-full h-full object-cover relative z-10 cursor-pointer hover:scale-[1.02] duration-200"
                      onClick={() => handleOpenGallery(index)}
                    />
                  </div>
                ))}
              </div>

              {data && data.fotky.length > 0 && (
                <p
                  className="uppercase font-semibold cursor-pointer  opacity-60 mt-16 text-left"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Späť na začiatok{" "}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="min-h-screen mt-8">
            <ClipLoader size={20} color={"#000000"} loading={true} />
          </div>
        )}

        {open && (
          <Lightbox
            open={open}
            slides={choosenAlbum}
            close={() => setOpen(false)}
            index={initialSlide}
          />
        )}

        {!isLoading && (
          <img
            src={"/icons/icon_gallery_id_left.svg"}
            className="absolute h-[578px] w-[373px] -left-40 top-[40%] hidden 3xl:block"
          />
        )}

        {!isLoading && (
          <img
            src={"/icons/icon_gallery_id_right.svg"}
            className="absolute h-[578px] w-[373px] -right-40 top-[20%] hidden 3xl:block"
          />
        )}
      </div>
    </div>
  );
};

export default GalleryPageId;
