import { appApi } from "@api";
import { LoginData } from "./type";

export const loginApi = {
	login: async (data: LoginData) => {
		return await appApi.post('auth/login', data);
	},
}