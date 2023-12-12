export type AuthState = {
	pending: boolean;
	data: Partial<TokenType>;
	error: string | null,
}

export type LoginData = {
	email: string;
	password: string;
}

export type LoginAction = {
	payload: {
		callback: () => void;
		data: LoginData;
	}
	type: string;
}

export type LoginPayload = {
	data: LoginData;
	callback: () => void;
}

export type UserToken = {
	name: string;
	id: string;
	token: string;
}

export type TokenType = {
	access_token: string;
	refresh_token: string;
}