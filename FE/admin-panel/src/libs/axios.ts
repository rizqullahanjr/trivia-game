import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.18.174:8000/api/"
})

export function setAuthToken(token: string) {
    if(token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}