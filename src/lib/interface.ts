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
  rodic: string | null;
  text: string;
  pdf: string[];
  fotky: string[];
}

export interface NavbarInfoData {
  id: string;
  nazov: string;
  link: string;
  poradie: number;
  typ: "link" | "pdf";
}

export interface Blog {
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
  pdf: string[];
}

// export const API_URL_BASIC =
//   "https://5iadehf6h7d46jwwlxicm4x3p40itdlf.lambda-url.eu-north-1.on.aws/api";

// export const API_URL_TASK =
//   "https://5iadehf6h7d46jwwlxicm4x3p40itdlf.lambda-url.eu-north-1.on.aws/apitask/task";

// export const API_URL_AMIN =
//   "https://5iadehf6h7d46jwwlxicm4x3p40itdlf.lambda-url.eu-north-1.on.aws/admin";

export const API_URL_BASIC = "http://localhost:5000/api";

export const API_URL_AMIN = "http://localhost:5000/admin";

export const API_URL_TASK = "http://localhost:5000/apitask/task";
