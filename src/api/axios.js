import axios from "axios";

const BASE_URL = "https://api.dealbot.ml/";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
