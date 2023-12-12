import { axiosClient } from "./axiosClient";

export const appApi = {
	get: async (url: string, params?: {}) => {
		return axiosClient.get(url, params)
	},
	post: async (url: string, data: unknown) => {
		return await axiosClient.post(url, data);
	},
	put: async (url: string, data: unknown) => {
		return await axiosClient.put(url, data);
	},
	patch: async (url: string, data: unknown) => {
		return await axiosClient.patch(url, data);
	},
	delete: async (url: string) => {
		return await axiosClient.delete(url);
	}
}