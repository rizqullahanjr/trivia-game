import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
