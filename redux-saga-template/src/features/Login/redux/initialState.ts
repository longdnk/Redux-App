import { AuthState } from "./type";

export const initialState: AuthState = {
    data: {
        refresh_token: '',
        access_token: '',
    },
    pending: false,
    error: ''
}