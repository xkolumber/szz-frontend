import { useQuery, useQueryClient } from "@tanstack/react-query";
import FaqElements from "./FaqElements";
import { Faq } from "../lib/interface";
import { fetchFaqDataClient } from "../lib/functions";
import { Helmet } from "react-helmet-async";

const FaqPage = () => {
  const queryClient = useQueryClient();

  const cachedFaqs = queryClient.getQueryData<Faq[]>(["faq"]);

  const {
    data: dataFaqs = cachedFaqs || [],
    isLoading,
    status,
    error,
  } = useQuery<Faq[]>({
    queryKey: ["faq"],
    queryFn: () => fetchFaqDataClient(),
    staleTime: 1000 * 60 * 10,
    enabled: !cachedFaqs,
  });

  if (isLoading) {
    return (
      <div className="own_edge ">
        <div className="main_section">
          <div className="flex flex-col  ">
            <div className="flex flex-col lg:w-1/2">
              {" "}
              <h2 className="uppercase">Najčastejšie kladené otázky</h2>
              <p>Tu nájdete odpovede na najčastejšie kladené otázky.</p>
            </div>
            <p className="mt-4 md:mt-12">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="own_edge ">
        <div className="main_section"></div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  return (
    <div className="own_edge ">
      <Helmet>
        <title>Najčastejšie kladené otázky</title>
        <meta
          name="description"
          content="Tu nájdete odpovede na najčastejšie kladené otázky"
        />
        <meta
          name="keywords"
          content="záhradkárstvo, Slovenský zväz záhradkárov, záhrada, ovocie, zelenina, zväz"
        />
        <meta name="author" content="Slovenský zväz záhradkárov" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.zvazzahradkarov.sk/faq" />
        <meta
          property="og:title"
          content="Tu nájdete odpovede na najčastejšie kladené otázky"
        />
        <meta
          property="og:description"
          content="Tu nájdete odpovede na najčastejšie kladené otázky"
        />
        <meta property="og:url" content="https://www.zvazzahradkarov.sk/faq" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="main_section">
        <div className="flex flex-col  ">
          <div className="flex flex-col lg:w-1/2">
            {" "}
            <h2 className="uppercase">Najčastejšie kladené otázky</h2>
            <p>Tu nájdete odpovede na najčastejšie kladené otázky.</p>
          </div>
          <div className="mt-4 md:mt-12">
            <FaqElements homepage={false} data={dataFaqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
