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
    title: "Odporúčané",
    slug: "/admin/sponzori",
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
    title: "Poradne",
    slug: "/admin/poradna",
  },
  {
    title: "Prednášky",
    slug: "/admin/prednasky",
  },
  {
    title: "Spravodajca",
    slug: "/admin/spravodajca",
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
    title: "Výstavy a podujatia",
    slug: "/admin/vystavy-a-podujatia",
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
    slug: "https://www.minv.sk/?obcianske-zdruzenia",
  },
  {
    title: "Tlačivá",
    slug: "/tlaciva",
  },
  {
    title: "Poradne",
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
    title: "Záhradkári spolupracujú",
    slug: "/odporucame",
  },
];

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const baseYear = 2011;

  return Array.from({ length: currentYear - baseYear + 1 }, (_, index) => {
    const year = currentYear - index;
    return { value: year.toString(), label: year.toString() };
  });
};

export const generateYearPlusOneOptions = () => {
  const currentYear = new Date().getFullYear() + 1;
  const baseYear = 2011;

  return Array.from({ length: currentYear - baseYear + 1 }, (_, index) => {
    const year = currentYear - index;
    return { value: year.toString(), label: year.toString() };
  });
};

export const options_years = generateYearOptions();
export const options_years_plus_one = generateYearPlusOneOptions();

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

export const LIMIT_BLOG = 10;

export const empty_three_values = ["", "", ""];

export const years = Array.from(
  { length: new Date().getFullYear() - 2019 + 1 },
  (_, index) => 2019 + index
);

export const stripHtmlTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
};

export function replaceS3UrlsWithCloudFront(url: string, type: string): string {
  const s3UrlRegex =
    /https:\/\/[a-zA-Z0-9.-]+\.s3\.[a-zA-Z0-9-]+\.amazonaws\.com/;

  if (type === "blogphoto") {
    const cloudFrontBaseUrl = import.meta.env.VITE_CLOUDFRONT_URL_IMAGES_BLOG;
    if (!cloudFrontBaseUrl) {
      throw new Error("CloudFront URL is not defined in environment variables");
    }
    return url.replace(s3UrlRegex, `${cloudFrontBaseUrl}`);
  }

  if (type === "archivedocs") {
    const cloudFrontBaseUrl = import.meta.env.VITE_CLOUDFRONT_URL_ARCHIVE_DOCS;
    if (!cloudFrontBaseUrl) {
      throw new Error("CloudFront URL is not defined in environment variables");
    }
    return url.replace(s3UrlRegex, `${cloudFrontBaseUrl}`);
  }
  if (type === "photoUnion") {
    const cloudFrontBaseUrl = import.meta.env.VITE_CLOUDFRONT_URL_IMAGE_UNION;
    if (!cloudFrontBaseUrl) {
      throw new Error("CloudFront URL is not defined in environment variables");
    }
    return url.replace(s3UrlRegex, `${cloudFrontBaseUrl}`);
  }
  if (type === "pdf") {
    const cloudFrontBaseUrl = import.meta.env.VITE_CLOUDFRONT_URL_PDF;
    if (!cloudFrontBaseUrl) {
      throw new Error("CloudFront URL is not defined in environment variables");
    }
    return url.replace(s3UrlRegex, `${cloudFrontBaseUrl}`);
  }
  if (type === "imagesalll") {
    const cloudFrontBaseUrl = import.meta.env.VITE_CLOUDFRONT_URL_IMAGES_ALL;
    if (!cloudFrontBaseUrl) {
      throw new Error("CloudFront URL is not defined in environment variables");
    }
    return url.replace(s3UrlRegex, `${cloudFrontBaseUrl}`);
  }

  return "";
}

export const webimages_link = "https://dnor665xhm8t8.cloudfront.net/webimages/";
