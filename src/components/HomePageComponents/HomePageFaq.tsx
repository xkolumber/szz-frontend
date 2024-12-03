import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFaqDataClient } from "../../lib/functions";
import { Faq } from "../../lib/interface";
import ButtonWithArrow from "../ButtonWithArrow";
import FaqElements from "../FaqElements";

const HomePageFaq = () => {
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
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="own_edge ">
      <div className="main_section">
        <div className="flex flex-col lg:flex-row  ">
          <div className="flex flex-col lg:w-1/2">
            {" "}
            <h2 className="uppercase max-w-[400px] text-center md:text-left">
              Najčastejšie kladené otázky
            </h2>
            <p className="">
              Tu nájdete odpovede na najčastejšie kladené otázky.
            </p>
          </div>
          <div className="lg:w-1/2  mt-4 md:mt-0">
            <FaqElements homepage={true} data={dataFaqs} />
            <div className="flex flex-col md:flex-row justify-between items-center mt-16 md:mt-8 mb-16">
              <h5 className="uppercase pb-2 md:pb-0">Viac nájdete tu</h5>

              <ButtonWithArrow
                link="faq"
                title="Klik sem"
                bg="#6B9156"
                color="#ffffff"
                justifyCenterMobile={true}
                padding={true}
                widthFull={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageFaq;
