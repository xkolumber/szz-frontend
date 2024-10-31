import { Link } from "react-router-dom";
import FaqElements from "../FaqElements";

const HomePageFaq = () => {
  return (
    <div className="own_edge ">
      <div className="main_section">
        <div className="flex flex-row  ">
          <div className="flex flex-col md:w-1/2">
            {" "}
            <h2 className="uppercase">Máte nejaké otázky?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Elit morbi leo leo eu non
              blandit quis interdum. Sed arcu posuere lectus facilisis iaculis
              mattis. Id.
            </p>
          </div>
          <div className="md:w-1/2">
            <FaqElements homepage={true} />
            <div className="flex flex-row justify-between items-center mt-8">
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
