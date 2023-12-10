import { UserErrorPayload, UserRequestPayload, UserSuccessPayload } from "./payload";
import { UserError, UserRequest, UserSuccess } from "./actionTypes";
import * as constants from "./constants";

export const userRequest = (payload?: UserRequestPayload): UserRequest => {
    return {
        type: constants.GET_USER_REQUEST,
        payload: payload ?? null,
    }
}

export const userSuccess = (payload: UserSuccessPayload): UserSuccess => {
    return {
        type: constants.GET_USER_SUCCESS,
        payload,
    }
}

export const userError = (payload: UserErrorPayload): UserError => {
    return {
        type: constants.GET_USER_ERROR,
        payload,
    }
}