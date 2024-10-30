export const data = [
  {
    title: "Domov",
    slug: "/domov",
  },
  {
    title: "O nás",
    slug: "/o-nas",
  },
  {
    title: "Blog",
    slug: "/blog",
  },
  {
    title: "Výstavy a podujatia",
    slug: "/vystavy-a-podujatia",
  },
  {
    title: "Archív",
    slug: "/archiv",
  },
  {
    title: "Galéria",
    slug: "/galeria",
  },
];

export const navbar_admin_data = [
  {
    title: "Domov",
    slug: "/admin",
  },
  {
    title: "O nás",
    slug: "/admin/o-nas",
  },
  {
    title: "Blog",
    slug: "/admin/blog",
  },
  {
    title: "Výstavy a podujatia",
    slug: "/admin/vystavy-a-podujatia",
  },
  {
    title: "Galéria",
    slug: "/admin/galeria",
  },
  {
    title: "Hlavička odkazy",
    slug: "/admin/hlavicka-odkazy",
  },
  {
    title: "Aktuálne práce",
    slug: "/admin/aktualne-prace",
  },
];

export const options_years = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];

export const options_months = [
  { value: "-1", label: "Vybrať..." },
  { value: "0", label: "Január" },
  { value: "1", label: "Február" },
  { value: "2", label: "Marec" },
  { value: "3", label: "Apríl" },
  { value: "4", label: "Máj" },
  { value: "5", label: "Jún" },
  { value: "6", label: "Júl" },
  { value: "7", label: "August" },
  { value: "8", label: "September" },
  { value: "9", label: "Október" },
  { value: "10", label: "November" },
  { value: "11", label: "December" },
];

export function createSlug(title: string): string {
  const slug = title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

  return slug;
}

export function isValidDate(datum: string) {
  const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;

  if (!datePattern.test(datum)) {
    return false;
  }

  const [day, month, year] = datum.split(".").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
