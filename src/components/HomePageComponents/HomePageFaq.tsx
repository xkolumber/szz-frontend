import { Link } from "react-router-dom";
import FaqElements from "../FaqElements";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Faq } from "../../lib/interface";
import { fetchFaqDataClient } from "../../lib/functions";

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
            <h2 className="uppercase">Máte nejaké otázky?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Elit morbi leo leo eu non
              blandit quis interdum. Sed arcu posuere lectus facilisis iaculis
              mattis. Id.
            </p>
          </div>
          <div className="lg:w-1/2  mt-4 md:mt-16">
            <FaqElements homepage={true} data={dataFaqs} />
            <div className="flex flex-row justify-between items-center mt-16 md:mt-8 mb-16">
              <h5 className="uppercase">Viac nájdete v poradni</h5>
              <Link className="btn btn--tertiary" to={"/poradna"}>
                Otvoriť poradňu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageFaq;
