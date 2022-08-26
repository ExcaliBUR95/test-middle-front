import axios, { AxiosRequestConfig } from 'axios'

export const API_URL = 'http://localhost:5000/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    res => res,
    async(error) => {
        const originalRequest = error.config;

        if(
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ){
            originalRequest._isRetry = true
            const tokenus = localStorage.getItem('token')
            const {token} = JSON.parse(tokenus)
             localStorage.setItem('token', JSON.stringify(token))
        }
        return $api.request(originalRequest)
    }
)

export default $api;