import { Link } from "react-router-dom";
import StepBack from "../../StepBack";

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear + 1; i >= currentYear - 15; i--) {
    years.push(i);
  }
  return years;
};

const years = generateYears();

const AdminEventsPage = () => {
  return (
    <div>
      <div className=" w-full">
        <StepBack />
        <h2>Výstavy a podujatia</h2>

        <Link to="/admin/vystavy-a-podujatia/nova-udalost">
          <p className="underline">Pridať novú výstavu / podujatie</p>
        </Link>

        <div className="flex flex-col gap-4 mt-4">
          {years.map((year, index) => (
            <Link
              key={index}
              className="btn btn--tertiary"
              to={`/admin/vystavy-a-podujatia/${year}`}
            >
              {year}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPage;
