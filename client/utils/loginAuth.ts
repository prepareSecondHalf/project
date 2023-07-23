import { Apis } from "./api";

let jwtAuthToken: string | null = null;

export const setAuthToken = (token: string) => {
  jwtAuthToken = token;
  if (typeof window !== undefined) localStorage.setItem("token", jwtAuthToken);
};

export const removeAuthToken = (token: string) => {
  jwtAuthToken = null;
  if (typeof window !== undefined) localStorage.removeItem("token");
};

export const getToken = () => {
  return jwtAuthToken;
};

export const setHeaderAuth = () => {
  if (jwtAuthToken) Apis.setTokenHeader(jwtAuthToken);
  else Apis.removeToken(jwtAuthToken);
};
