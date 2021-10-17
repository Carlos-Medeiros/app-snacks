import axios from "axios";

export const API_URL = 'https://lanchonete-da-ge.herokuapp.com'

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem('@token')}`;
        return config
    },
    error => {
        return Promise.reject(error);
    }
);

