import { Link } from "react-router-dom";
import StepBack from "../../StepBack";

const AdminGalleryPage = () => {
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 1; i >= currentYear - 15; i--) {
      years.push(i);
    }
    return years;
  };

  const years = generateYears();
  return (
    <div>
      <StepBack />
      <h2>Galéria</h2>
      <Link to="/admin/galeria/novy-album">
        <p className="underline">Pridať novú galériu</p>
      </Link>
      {years.map((year, index) => (
        <Link
          key={index}
          className="btn btn--tertiary"
          to={`/admin/galeria/${year}`}
        >
          {year}
        </Link>
      ))}
    </div>
  );
};

export default AdminGalleryPage;
