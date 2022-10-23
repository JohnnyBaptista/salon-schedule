import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "application/json,  text/plain, */*",
    "Content-Type": "application/json",
  },
});

export default api;