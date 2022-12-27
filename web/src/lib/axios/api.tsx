import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL;
}

const { "nextwebauth.token": nextwebauth } = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3003",
});

if (nextwebauth) {
  api.defaults.headers["Authorization"] = `Bearer ${nextwebauth}`;
}
