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

export const API_URL = "http://localhost:5000/apitask/task";
