import axios, { AxiosError, AxiosRequestConfig } from "axios";

function getBaseUrl() {
  return process.env.BASE_API_URL;
}

export const api = axios.create({
  baseURL: "http://localhost:3003",
});
