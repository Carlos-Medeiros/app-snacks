import axios from "axios";

const API = axios.create({
    baseURL:'https://lanchonete-da-ge.herokuapp.com'
});

export default API;

export function register() {
    return axios(`${API}/register`)
}

export function postEmailValidator() {
    return axios.post(`${API}/emailValidator`)
}

export function getEmailValidation() {
    return axios.get(`${API}/emailValidator/${email}`);
}

export function putEmailValidation() {
    return axios.put(`${API}/emailValidator/${email}`);
}