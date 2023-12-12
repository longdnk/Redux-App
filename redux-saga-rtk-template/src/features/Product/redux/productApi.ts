import { appApi, axiosClient } from "@api";
import { Product } from "./type";

export const productApi = {
	get: async (url: string) => {
		return await appApi.get(url);
	},
	post: async (url: string, data: Omit<Product, 'id'>) => {
		return await appApi.post(url, data);
	},
	put: async (url: string, data: Product) => {
		return await axiosClient.put(url, data);
	},
	patch: async (url: string, data: Product) => {
		return await axiosClient.patch(url, data);
	},
	delete: async (url: string) => {
		return await axiosClient.delete(url);
	}
}