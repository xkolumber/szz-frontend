export interface ActualJob {
  id: string;
  mesiac: string;
  link: string;
  text: string;
  farba: string;
}

export interface ActualEvent {
  nazov_vystavy: string;
  datum: string;
  miesto_podujatia: string;
  cas: string;
  titulna_foto: string;
  text1: string;
  text2: string;
  slug: string;
  typ: "SK" | "ZAH";
}

export interface Gallery {
  id: string;
  nazov: string;
  datum: string;
  fotky: string[];
  rok: string;
}

export interface UnionData {
  id: string;
  nazov: string;
  slug: string;
  rodic: string;
  text: string;
  pdf: string[];
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
  pdf: string;
}

export interface Faq {
  id: string;
  otazka: string;
  odpoved: string;
}
