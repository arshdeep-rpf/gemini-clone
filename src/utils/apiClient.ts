import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  headers: { "x-gemini-userId": 1 },
});
