import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  image?: string;
}

const SeoElement = ({ title, description, image }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
      />
      <meta name="author" content="Slovenský zväz záhradkárov" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="https://www.zvazzahradkarov.sk/prednasky" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

export default SeoElement;
