import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    accept: "application/json",
    // withCredentials: true,
  },
});

export const Apis = {
  delete: (url: string, params?: any) =>
    api.delete(url, params).then((res: any) => res.data),
  get: (url: string, params?: any) =>
    api.get(url, params).then((res: any) => res.data),
  // get: (url: string) => api.get(url).then((res: any) => res.data),
  post: (url: string, payload: any, options?: any) =>
    api.post(url, payload, options).then((res: any) => res.data),
  setTokenHeader: (authToken: string) =>
    (api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`),
  removeToken: (authToken: string | null) => {
    if (!authToken) delete api.defaults.headers.common["Authorization"];
  },
};
