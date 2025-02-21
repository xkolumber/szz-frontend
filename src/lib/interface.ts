export interface ActualJob {
  id: string;
  mesiac: string;
  mesiac_cislo: number;
  pdf: Pdf;
  text: string;
  farba: string;
  link_pranostika: string;
}

export interface ActualEvent {
  id: string;
  link_podujatie: string;
  nazov_vystavy: string;
  datum_den: string;
  datum_mesiac: string;
  datum_rok: string;
  datum_koniec: string;
  miesto_podujatia: string;
  cas: string;
  hostia: string;
  titulna_foto: string;
  text1: string;
  slug: string;
  typ: "vsetky" | "zvaz";
  pdf: Pdf[];
  fotky: string[];
}

export interface Gallery {
  id: string;
  nazov: string;
  datum: string;
  fotky: string[];
  rok: string;
  link_album: string;
}

export interface UnionData {
  id: string;
  nazov: string;
  slug: string;
  rodic: string;
  text: string;
  pdf: Pdf[];
  fotky: string[];
}

export interface UnionDataIdName {
  id: string;
  nazov: string;
}
export interface SelectOption {
  label: string;
  value: string;
}

export interface NavbarInfoData {
  id: string;
  nazov: string;
  link: string;
  poradie: number;
  typ: "link" | "pdf";
}

export interface Blog {
  id: string;
  nazov_blog: string;
  slug: string;
  datum: string;
  titulna_foto: string;
  popis1: string;
  foto1: string;
  popis2: string;
  foto2: string;
  popis3: string;
  foto3: string;
  pdf: Pdf[];
}

export interface Faq {
  id: string;
  otazka: string;
  odpoved: string;
}

export interface Pdf {
  nazov: string;
  link: string;
  datum: Date;
}

export interface AboutUsPage {
  id: string;
  text1: string;
  foto1: string;
  text2: string;
  foto2: string;
  text3: string;
  foto3: string;
  datum: string;
}

export interface ContactPageInterface {
  id: string;
  foto1: string;
  text1: string;
}

export interface Archive {
  id: string;
  pdf_link: string;
  pdf_nazov: string;
  rok: string;
  typ: string;
}

export interface Sponsor {
  id: string;
  link: string;
  logo: string;
  nazov: string;
}

export interface Tlacivo {
  id: string;
  link: string;
  nazov: string;
  typ: string;
}

export interface Oznamy {
  id: string;
  viditelnost: boolean;
  text1: string;
  datum: string;
  nazov: string;
  foto: string;
  slug: string;
}

export interface GeneralPageInterface {
  id: string;
  text1: string;
  pdf: Pdf[];
}

export interface Diplomas {
  id: string;
  fotky: string[];
}

export interface ArchiveEvent {
  id: string;
  datum: string;
  dokumenty: string[];
  nazov: string;
  rok: string;
}

export interface Spravodajca {
  id: string;
  nazov: string;
  rok: number;
  mesiac: number;
  foto: string;
  text1: string;
  pdf: Pdf[];
}

export interface SearchData {
  nazov: string;
  link: string;
  najdeny_text: string;
}

export interface Navstevnost {
  navstevnost: number;
}
