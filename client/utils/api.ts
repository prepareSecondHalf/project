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
  get: (url: string, payload: any) => api.get(url).then((res: any) => res.data),
  post: (url: string, payload: any, options?: any) =>
    api.post(url, payload, options).then((res: any) => res.data),
};
