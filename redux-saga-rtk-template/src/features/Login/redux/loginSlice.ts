import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, UserToken } from "./type";
import { PayloadError, pushNotification, setToken } from "@helper";

const initialState: AuthState = {
	data: {},
	pending: false,
	error: '',
}

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		loginRequest: (state, action: PayloadAction<LoginPayload>) => {
			state.pending = true;
		},
		loginSuccess: (state, action: PayloadAction<UserToken>) => {
			pushNotification({ type: "success", message: 'Login success' });
			state.pending = false;
			state.error = '';
			setToken(action.payload);
		},
		loginError: (state, action: PayloadAction<PayloadError>) => {
			pushNotification({ type: "error", message: action.payload.response.data.message ?? action.payload.message });
			state.pending = false;
			state.error = 'test';
		}
	}
})

export const {
	loginRequest,
	loginSuccess,
	loginError,
} = loginSlice.actions;

export default loginSlice;