import * as constants from "./constants";
import { LoginErrorPayload, LoginPayload, LoginSuccessPayload } from "./payload";
import { AnyAction } from "@reduxjs/toolkit";

export type LoginRequest = {
    type: typeof constants.LOGIN_REQUEST,
    payload: LoginPayload,
}

export type LoginSuccess = {
    type: typeof constants.LOGIN_SUCCESS,
    payload: LoginSuccessPayload,
}

export type LoginError = {
    type: typeof constants.LOGIN_ERROR,
    payload: LoginErrorPayload,
}

export type AuthActions = LoginRequest | LoginSuccess | LoginError | AnyAction;