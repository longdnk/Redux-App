import { appApi } from "@api";
import { LoginData } from "@features/Login/redux/type";

export const loginApi = {
	login: async (data: LoginData) => {
		return await appApi.post('auth/login', data);
	},
}