import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
});

export const Apis = {
  get: (url: string) => api.get(url).then((res: any) => res.data),
  post: (url: string, payload: any) =>
    api.post(url, payload).then((res: any) => res.data),
};
