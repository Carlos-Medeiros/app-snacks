import axios from "axios";

const API = axios.create({
    baseURL:'https://lanchonete-da-ge.herokuapp.com'
});

export default API;
