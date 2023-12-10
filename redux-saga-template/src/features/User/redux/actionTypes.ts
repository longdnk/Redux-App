import * as constants from "./constants";
import { UserErrorPayload, UserRequestPayload, UserSuccessPayload } from "./payload";
import { AnyAction } from "@reduxjs/toolkit";

export type UserRequest = {
    type: typeof constants.GET_USER_REQUEST,
    payload: UserRequestPayload,
}

export type UserSuccess = {
    type: typeof constants.GET_USER_SUCCESS,
    payload: UserSuccessPayload,
}

export type UserError = {
    type: typeof constants.GET_USER_ERROR,
    payload: UserErrorPayload,
}

export type UserGet = UserRequest | UserSuccess | UserError;

export type UserAction = UserGet | AnyAction;