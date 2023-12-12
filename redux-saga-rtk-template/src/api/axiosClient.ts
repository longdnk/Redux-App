import axios from "axios";
import { applyToken } from "@helper";

export const axiosClient = axios.create({
	baseURL: 'https://api.escuelajs.co/api/v1/',
	headers: {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		Acceptable: 'application/json',
		Authorization: '',
	},
	timeout: 20000,
})

// Add a request interceptor
axiosClient.interceptors.request.use(config => {
	// Do something before request is sent
	config.headers = applyToken();
	return config;
}, error => {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(response => {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response;
}, error => {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	return Promise.reject(error);
});