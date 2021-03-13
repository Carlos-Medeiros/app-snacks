import axios from "axios";

const API = axios.create({
    baseURL:'https://app-snacks.herokuapp.com'
});

export default API;

export function register() {
    return axios(`${API}/register`)
}

export function emailValidator() {
    return axios(`${API}/emailValidator`)
}