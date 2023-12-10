import { AuthState } from "./type";
import { AuthActions } from "./actionTypes";
import * as constants from "./constants";
import { initialState } from './initialState';
import { pushNotification } from "@helper";

export const reducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {
                ...state,
                pending: true,
            }
        case constants.LOGIN_SUCCESS:
            pushNotification({ type: 'success', message: 'Login success' });
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: '',
            }
        case constants.LOGIN_ERROR:
            pushNotification({ type: 'error', message: action.payload.response.data.message ?? 'Login Error' });
            return {
                ...state,
                pending: false,
                error: '',
            }
        default:
            return {
                ...state,
            }
    }
}