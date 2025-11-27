import axios from "axios";
import { useAuthStore } from "../context/authstore";

const url = (import.meta as any).env.VITE_API_URL;

export const api = axios.create({
  baseURL: `${url}/api`,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
