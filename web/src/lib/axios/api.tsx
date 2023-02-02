import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL;
}

const { next_access_token: access_token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

if (access_token) {
  api.defaults.headers["Authorization"] = `Bearer ${access_token}`;
}
