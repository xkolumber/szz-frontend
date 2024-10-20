export interface ActualJob {
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

export const API_URL_BASIC =
  "https://5iadehf6h7d46jwwlxicm4x3p40itdlf.lambda-url.eu-north-1.on.aws/api";

export const API_URL_TASK =
  "https://5iadehf6h7d46jwwlxicm4x3p40itdlf.lambda-url.eu-north-1.on.aws/apitask/task";

// export const API_URL_BASIC = "http://localhost:5000/api";

// export const API_URL_TASK = "http://localhost:5000/apitask/task";
