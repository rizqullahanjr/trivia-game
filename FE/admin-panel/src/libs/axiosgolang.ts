import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.18.174:5000/api/v1"
})

if (typeof window !== "undefined") { // Check if running in a browser
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
        API.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
}