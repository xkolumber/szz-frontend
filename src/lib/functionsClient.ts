export const navbar_data = [
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
  {
    title: "Kontakt",
    slug: "/kontakt",
  },
];

export const navbar_admin_data = [
  {
    title: "Aktuality",
    slug: "/admin/aktuality",
  },
  {
    title: "Aktuálne práce",
    slug: "/admin/aktualne-prace",
  },
  {
    title: "Archív",
    slug: "/admin/archiv",
  },
  {
    title: "Blog",
    slug: "/admin/blog",
  },
  {
    title: "Deti a mládež",
    slug: "/admin/deti-a-mladez",
  },
  {
    title: "Galéria",
    slug: "/admin/galeria",
  },
  {
    title: "Gdpr",
    slug: "/admin/gdpr",
  },
  {
    title: "Hlavička odkazy",
    slug: "/admin/hlavicka-odkazy",
  },
  {
    title: "Kontakt",
    slug: "/admin/kontakt",
  },
  {
    title: "O nás",
    slug: "/admin/o-nas",
  },
  {
    title: "Otázky a odpovede",
    slug: "/admin/otazky-a-odpovede",
  },
  {
    title: "Oznamy",
    slug: "/admin/oznamy",
  },
  {
    title: "Poradňa",
    slug: "/admin/poradna",
  },
  {
    title: "Prednášky",
    slug: "/admin/prednasky",
  },
  {
    title: "Výstavy a podujatia",
    slug: "/admin/vystavy-a-podujatia",
  },
  {
    title: "Odporúčané",
    slug: "/admin/sponzori",
  },
  {
    title: "Tlačivá",
    slug: "/admin/tlaciva",
  },
  {
    title: "Užitočné linky",
    slug: "/admin/uzitocne-linky",
  },
  {
    title: "Zľavy",
    slug: "/admin/zlavy",
  },
  {
    title: "Zväz",
    slug: "/admin/zvaz",
  },
];

export const footer_data = [
  {
    title: "Register",
    slug: "/zvaz",
  },
  {
    title: "Tlačivá",
    slug: "/tlaciva",
  },
  {
    title: "Poradňa",
    slug: "/poradna",
  },
  {
    title: "Prednášky",
    slug: "/prednasky",
  },
  {
    title: "Zľavy pre členov",
    slug: "/zlavy",
  },
  {
    title: "Užitočné linky",
    slug: "/uzitocne-linky",
  },
  {
    title: "Odporúčame",
    slug: "/odporucame",
  },
];

export const options_years = [
  { value: "2025", label: "2025" },
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

export function isValidTime(time: string): boolean {
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timePattern.test(time);
}

export function isValidMonth(month: string): boolean {
  if (!/^\d+$/.test(month)) {
    return false;
  }
  const numericMonth = parseInt(month, 10);
  return (
    numericMonth >= 1 && numericMonth <= 12 && numericMonth.toString() === month
  );
}

export function isValidYear(year: string): boolean {
  return year.length === 4 && /^\d{4}$/.test(year);
}

export const LIMIT_BLOG = 4;

export const empty_three_values = ["", "", ""];

export const years = [
  2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2028, 2029, 2030,
];
