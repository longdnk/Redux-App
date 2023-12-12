import { axiosClient, appApi } from "@api";
import { Category } from "./type";

export const categoryApi = {
	get: async (url: string) => {
		return await appApi.get(url);
	},
	post: async (url: string, data: Category) => {
		return await appApi.post(url, data);
	},
	put: async (url: string, data: Category) => {
		return await axiosClient.put(url, data);
	},
	patch: async (url: string, data: Category) => {
		return await axiosClient.patch(url, data);
	},
	delete: async (url: string) => {
		return await axiosClient.delete(url);
	}
}