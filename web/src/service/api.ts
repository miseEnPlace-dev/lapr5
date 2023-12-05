import axios from "axios";

interface IGetOptions {
  headers?: {
    [key: string]: string;
  };
  query?: {
    [key: string]: string;
  };
}

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
