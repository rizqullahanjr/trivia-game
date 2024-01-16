import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.18.174:8000/api/"
})

export function setAuthToken(token: string) {
    if (token) {
        localStorage.setItem('authToken', token); // Save token to localStorage
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('authToken'); // Remove token from localStorage
        delete API.defaults.headers.common["Authorization"];
    }
}

// Initialize Axios with token from localStorage if it exists
const savedToken = localStorage.getItem('authToken');
if (savedToken) {
    API.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}