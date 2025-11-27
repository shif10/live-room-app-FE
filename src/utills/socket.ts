import { io } from "socket.io-client";
import { useAuthStore } from "../context/authstore";

const url=(import.meta as any).env.VITE_API_URL;
const token = useAuthStore.getState().token;
export const socket = io(url, {
  withCredentials: true,
  auth: {
    token: token,
  },
});
