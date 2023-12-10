import * as constants from "./constants";
import { LoginErrorPayload, LoginPayload, LoginSuccessPayload } from "./payload";
import { LoginError, LoginRequest, LoginSuccess } from "./actionTypes";


export const loginRequest = (payload: LoginPayload): LoginRequest => {
    return {
        type: constants.LOGIN_REQUEST,
        payload
    }
}

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => {
    return {
        type: constants.LOGIN_SUCCESS,
        payload,
    }
}

export const loginError = (payload: LoginErrorPayload): LoginError => {
    return {
        type: constants.LOGIN_ERROR,
        payload,
    }
}