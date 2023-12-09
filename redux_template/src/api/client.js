import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'https://654235f1f0b8287df1ffb3ca.mockapi.io/api/v1/',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    timeout: 10000,
    timeoutErrorMessage: 'Time limit exceed!!!',
})

axios.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});