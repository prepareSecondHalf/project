import { Apis } from "./api";

let jwtAuthToken: string | null = null;

export const setAuthToken = (token: string, email: string) => {
  jwtAuthToken = token;
  if (typeof window !== undefined) {
    localStorage.setItem("token", jwtAuthToken);
    localStorage.setItem("email", email);
  }
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
