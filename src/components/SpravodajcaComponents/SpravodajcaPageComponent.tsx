import { useEffect, useState } from "react";
import { Spravodajca } from "../../lib/interface";
import AttachedFiles from "../AttachedFiles";
import ButtonWithArrowLeft from "../ButtonWithArrowLeft";
import IconCloseButtonBlack from "../Icons/IconCloseButtonBlack";
import { Helmet } from "react-helmet-async";

interface Props {
  data: Spravodajca[];
}
const SpravodajcaPageComponent = ({ data }: Props) => {
  const [clickedObject, setClickedObject] = useState<Spravodajca | null>(null);

  useEffect(() => {
    if (clickedObject != null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [clickedObject]);

  return (
    <div className="main_section !pt-8">
      <Helmet>
        <title>Spravodajca</title>
        <meta name="description" content="Zoznam vydaní časopisu Spravodajca" />
        <meta
          name="keywords"
          content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
        />
        <meta name="author" content="Slovenský zväz záhradkárov" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href="https://www.zvazzahradkarov.sk/spravodajca"
        />
        <meta property="og:title" content="Záhradkársky blog" />
        <meta
          property="og:description"
          content="Zoznam vydaní časopisu Spravodajca"
        />
        <meta
          property="og:url"
          content="https://www.zvazzahradkarov.sk/spravodajca"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
      <div className="max-w-[900px] m-auto mt-8">
        <h2 className="text-center">Spravodajca</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {data?.map((object, index) => (
            <div
              className="flex flex-col hover:scale-[1.02] duration-200"
              key={index}
              onClick={() => setClickedObject(object)}
            >
              <img
                src={object.foto}
                width={400}
                height={400}
                className="cursor-pointer h-[350px] object-cover"
              />
              <p className="text-center pt-4">{object.nazov}</p>
            </div>
          ))}
        </div>
      </div>
      {clickedObject && (
        <>
          <div className="behind_card_background"></div>
          <div className="popup_message relative">
            <div
              className="absolute right-0 top-0 m-4"
              onClick={() => setClickedObject(null)}
            >
              {" "}
              <IconCloseButtonBlack />
            </div>

            <div
              className="content pt-4 max-h-[250px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: clickedObject.text1 }}
            />
            {clickedObject.pdf.length > 0 && (
              <>
                <h6 className="bold underline pt-4">Dokumenty na stiahnutie</h6>
                <AttachedFiles pdf={clickedObject.pdf} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SpravodajcaPageComponent;
