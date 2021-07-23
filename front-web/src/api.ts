import axios from "axios";

const API_URL = 'https://lanchonete-da-ge.herokuapp.com'

export function fetchCategorys() {
    return axios.get(`${API_URL}/categorys`)
}