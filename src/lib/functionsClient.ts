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

export const LIMIT_BLOG = 4;

export const questions = [
  {
    title: "Je mykorhíza hnojivo?",
    text: "Nie je to tak. Mykorhíza je symbióza rastlín a pôdnych (mykorhíznych) húb. Mykohrízne huby žijú v koreňoch alebo na koreňoch rastliny a podporujú ju počas celého jej života. Zlepšujú príjem hnojív a vody z pôdy. Na rozdiel od hnojív sa mykorhízne huby nemusia pridávať opakovane. Na hnojenie rastlín odporúčame úplne prírodné hnojivo Conavit.",
  },
  {
    title: "Je možné aplikovať mykorhízu zalievaním alebo postrekom?",
    text: "Bohužiaľ, nie je možné použiť ani zalievanie, ani postrek. Mykorhízne huby sa musia pripojiť ku koreňovému systému rastliny. Preto sa prípravky Symbiom musia aplikovať priamo na korene rastliny alebo do pôdy v blízkosti koreňov rastliny.",
  },
  {
    title: "Rastliny už mám zasadené. Môžem ešte nejako použiť mykorhízu?",
    text: "Môžete. Len pozor, mykorhízne huby sa musia dostať čo najbližšie ku koreňom rastliny. Preto sa musia aplikovať do koreňovej zóny, a to buď vykopávaním pôdy, kopaním jamiek (15 - 20 cm hlbokých) alebo pomocou injektora.",
  },
  {
    title: "Potrebujú huby v produktoch Symbiom vegetačný pokoj?",
    text: "Mykorhízne huby nepotrebujú vegetačný pokoj. Kopírujú životný cyklus rastliny, v ktorej koreňovom systéme žijú.",
  },
  {
    title: "Existuje len jeden druh pôdnej huby?",
    text: "Existuje niekoľko druhov mykorhíznych húb. Jednotlivé produkty Symbiom preto obsahujú len tie druhy, ktoré zodpovedajú danej skupine rastlín a sú pre ne najprínosnejšie. Vždy si vyberte správny mykorhízny prípravok podľa rastlín, ktoré chcete pestovať.",
  },
  {
    title: "Je mykorhíza účinná pre všetky rastliny?",
    text: "Mykorhíznu symbiózu možno nájsť u viac ako 80 % rastlín sveta, s výnimkou čelade kapustovité a láskavcovité napr. kel, kapusta, ružičkový kel, predklíčka, repa, repka, špenát, kaleráb a iné. U zástupcov týchto čeľadí rastlín sa neoplatí aplikovať mykorhízne prípravky.",
  },
  {
    title: "Ako viem, ktorý výrobok si mám vybrať?",
    text: "Každý z našich produktov sa zameriava na konkrétnu skupinu rastlín podľa príslušného druhu mykorhíznej huby. Pre ľahšiu orientáciu v produktoch Symbiom môžete použiť vyhľadávacie pole na odkaze https://www.symbiom.sk/vyhladavanie alebo náš prehľad rastlín a tabuľku vhodnosti.",
  },
  {
    title: "Môžem rastlinu predávkovať?",
    text: "Nemôžete. Aj minimálne množstvo prípravku môže vytvoriť mykorhízu a postupne kolonizovať celý koreňový systém, ale trvá to niekoľko mesiacov. Preto je vhodnejšie aplikovať do koreňovej zóny odporúčané minimálne množstvo prípravku, aby sa kolonizácia koreňov urýchlila a rastlina mohla čo najskôr využívať výhody mykorhízy.",
  },
  {
    title: "Ak sú mykorhízne huby už v pôde, prečo ich znova aplikovať?",
    text: "Mykorhíznych húb je v niektorých pôdach pomerne málo a môžu byť vo väčšej vzdialenosti od novovytvorených koreňov rastlín. To môže spomaliť vytváranie mykorhíznej symbiózy a tiež mať pozitívny vplyv na rast rastlín. Čím skôr sa mykorhíza vytvorí, tým lepšie pre rastlinu. Okrem toho v niektorých pôdach môžu byť populácie mykorhíznych húb výrazne negatívne ovplyvnené predchádzajúcimi agrotechnickými postupmi (hlboká orba, používanie hnojív, pesticídov atď.), takže aplikácia mykorhíznych húb je zase potrebná na oživenie pôdy.",
  },
  {
    title: "Môžem použiť pesticídy na rastliny ošetrené mykorhíznymi hubami?",
    text: "Pesticídy aplikované na listy rastlín vo všeobecnosti nemajú nepriaznivý vplyv na tvorbu alebo funkciu mykorhízy. Naopak, niektoré systémové alebo kontaktné fungicídy aplikované do pôdy môžu mykorhízu eliminovať až dokonca zničiť.",
  },
  {
    title: "Ovplyvní aplikácia hnojív vývoj mykorhízy?",
    text: "Vysoké dávky hnojív, najmä fosforečných, negatívne ovplyvňujú vývoj mykorhíznych húb v pôde. Možný inhibičný účinok je v prípade organických hnojív s postupným uvoľňovaním podstatne menší ako pri anorganických rozpustných hnojivách.",
  },
  {
    title: "Pôsobi mykorhíza proti chorobám rastlín?",
    text: "Mykorhíza vo všeobecnosti zlepšujú zdravie a vitalitu rastlín a ich koreňov. Preto rastliny s mykorhíznymi hubami lepšie odolávajú infekciám spôsobeným rastlinnými patogénmi (najmä koreňovými patogénmi).",
  },
  {
    title: "Vyskytujú sa v kompostoch mykorhízne huby?",
    text: "Mykorhízne huby nie sú v kompostoch prirodzene prítomné. Kompost sa počas výroby často zahrieva na teplotu 50-60 °C, čo ničí mykorhízne huby a iné prospešné mikroorganizmy.",
  },
  {
    title: "Môže kompost ovplyvniť mykorhízu?",
    text: "Niektoré komposty sú kompatibilné s mykorhíznymi hubami a ich použitie je preto neobmedzené. Iné však môžu mať vysoký obsah solí alebo živín, ktoré inhibujú mykorhízne huby.",
  },
  {
    title: "Ako dlho prežívajú mykorhízne huby v pôde?",
    text: "Spóry arbuskulárnych mykorhíznych húb sú veľmi odolné a môžu žiť v pôde mnoho rokov bez koreňov hostiteľskej rastliny. V optimálnych podmienkach môžu prežiť až niekoľko rokov, najmenej však dva. Ideálne je aplikovať ich priamo pri výsadbe na koreň rastliny, vtedy je účinok najviditeľnejší.",
  },
];
