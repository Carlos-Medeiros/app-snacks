import axios from "axios";

export const API_URL = 'https://lanchonete-da-ge.herokuapp.com'
const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;

export function fetchCategorys() {
    return axios.get(`${API_URL}/categorys/products`)
}

export function fetchLocalMapBox(local) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)
}