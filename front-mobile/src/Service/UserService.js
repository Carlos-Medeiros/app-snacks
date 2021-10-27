import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API from "../api";

class UserService {

    async login(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + "/user/login",
            method: "POST",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            AsyncStorage.setItem('@token', response.data.token)
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async userDetails() {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + "/user/details",
            method: "GET",
            timeout: API.TIMEOUT_REQUEST,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async editName(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + "/user/name",
            method: "PATCH",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async editPassword(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + "/user/password",
            method: "PATCH",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async editPhone(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + "/user/phone",
            method: "PATCH",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async forgotPassword(data, email) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + `/user/${email}`,
            method: "PATCH",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async resendCode(email) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + `/emailValidator/${email}/1`,
            method: "PUT",
            timeout: API.TIMEOUT_REQUEST,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async sendCode(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + `/keyValidation`,
            method: "POST",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async emailExisting(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + `/emailExisting`,
            method: "POST",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async emailValidation(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + `/emailValidator`,
            method: "POST",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async emailCode(email) {
        let token = await AsyncStorage.getItem('@token')
        console.log(email)
        return axios({
            url: API.API_URL + `/emailValidator/${email}/0`,
            method: "PUT",
            timeout: API.TIMEOUT_REQUEST,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async register(data) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + `/user/register`,
            method: "POST",
            timeout: API.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async orderDelivered(order) {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + `/orders/${order.id}/delivered`,
            method: "PATCH",
            timeout: API.TIMEOUT_REQUEST,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async allOrderDelivery() {
        let token = await AsyncStorage.getItem('@token')
        return axios({
            url: API.API_URL + "/orders/readyForDelivery",
            method: "GET",
            timeout: API.TIMEOUT_REQUEST,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

}
const userService = new UserService()
export default userService
