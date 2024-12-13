import { useEffect, useState } from "react";
import { AboutUsPage } from "../../lib/interface";

interface Props {
  data: AboutUsPage;
}

const AboutUsComponent = ({ data }: Props) => {
  const [highlightedText1, setHighlightedText1] = useState<string | undefined>(
    undefined
  );
  const [highlightedText2, setHighlightedText2] = useState<string | undefined>(
    undefined
  );
  const [highlightedText3, setHighlightedText3] = useState<string | undefined>(
    undefined
  );
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.substring(1));

    if (hash && data) {
      const regex = new RegExp(`(${hash})`, "gi");

      const highlightText = (text: string | undefined) => {
        if (text) {
          return text.replace(regex, `<span class="highlight">$1</span>`);
        }
        return text;
      };

      setHighlightedText1(highlightText(data.text1));
      setHighlightedText2(highlightText(data.text2));
      setHighlightedText3(highlightText(data.text3));
    }
  }, [data, params]);

  useEffect(() => {
    const highlightedElement = document.querySelector(".highlight");
    if (highlightedElement) {
      highlightedElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedText1, highlightedText2, highlightedText3]);

  return (
    <div>
      {data && (
        <div>
          <div
            className="content pt-4"
            dangerouslySetInnerHTML={{
              __html: highlightedText1 || data.text1,
            }}
          />
          <img
            width={120}
            height={120}
            src={data.foto1}
            className="mt-4 mb-4 object-cover w-full h-full rounded-[16px]"
          />
          {data.text2 && (
            <div
              className="content mt-[40px]"
              dangerouslySetInnerHTML={{
                __html: highlightedText2 || data.text2,
              }}
            />
          )}
          {data.foto2 && (
            <img
              width={120}
              height={120}
              src={data.foto2}
              className="mt-4 mb-4 cursor-pointer object-cover w-full h-full rounded-[16px]"
            />
          )}
          {data.text3 && (
            <div
              className="content mt-[40px]"
              dangerouslySetInnerHTML={{
                __html: highlightedText3 || data.text3,
              }}
            />
          )}
          {data.foto3 && (
            <img
              width={600}
              height={600}
              src={data.foto3}
              className="mt-4 mb-4 cursor-pointer object-cover w-full h-full rounded-[16px]"
            />
          )}
          <h5 className="uppercase pt-8">Ako sa k nám dostanete</h5>

          <iframe
            title="Bratislava Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10706.218176607592!2d17.0986359!3d48.1566009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8bfdb8b3c737%3A0xca68190e08a57721!2sSlovensk%C3%BD%20zv%C3%A1z%20z%C3%A1hradk%C3%A1rov%20%E2%80%93%20Republikov%C3%BD%20v%C3%BDbor!5e0!3m2!1ssk!2ssk!4v1699213019176!5m2!1ssk!2ssk"
            allowFullScreen={true}
            loading="lazy"
            className="rounded-[16px] w-full h-[400px]"
          ></iframe>
          <div className="flex flex-row justify-between opacity-60 mt-16">
            <p className="uppercase font-semibold">Publikované {data.datum}</p>
            <p
              className="uppercase font-semibold cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Späť na začiatok
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsComponent;
