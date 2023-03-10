import axios from "axios";
import { API_KEY, DB_URL } from "@env";

export const instanceAxios = axios.create({
  baseURL: DB_URL,
  headers: { "api-key": API_KEY },
  method: "post",
});

export const config = {
  url: "/action/find",
  data: {
    database: "books",
    dataSource: "Cluster0",
  },
};
