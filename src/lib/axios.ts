import axios from "axios";
import { getStoredAuthToken } from "@/lib/auth-token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://reactif.dcodax.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
