import {
    AddUserErrorPayload,
    AddUserPayload,
    AddUserSuccessPayload, DeleteUserErrorPayload, DeleteUserPayload, DeleteUserSuccessPayload, DetailUserErrorPayload,
    DetailUserPayload, DetailUserSuccessPayload, EditUserErrorPayload, EditUserPayload, EditUserSuccessPayload,
    UserErrorPayload,
    UserRequestPayload,
    UserSuccessPayload
} from "./payload";
import {
    AddUserError,
    AddUserRequest,
    AddUserSuccess, DeleteUserError, DeleteUserRequest, DeleteUserSuccess, EditUserError, EditUserRequest, EditUserSuccess,
    UserDetail, UserDetailError,
    UserDetailRequest,
    UserDetailSuccess,
    UserError,
    UserRequest,
    UserSuccess
} from "./actionTypes";
import * as constants from "./constants";
// GET USER
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

// ADD USER
export const addUserRequest = (payload: AddUserPayload): AddUserRequest => {
    return {
        type: constants.ADD_USER_REQUEST,
        payload,
    }
}

export const addUserSuccess = (payload: AddUserSuccessPayload): AddUserSuccess => {
    return {
        type: constants.ADD_USER_SUCCESS,
        payload,
    }
}

export const addUserError = (payload: AddUserErrorPayload): AddUserError => {
    return {
        type: constants.ADD_USER_ERROR,
        payload,
    }
}

// DETAIL
export const detailUserRequest = (payload: DetailUserPayload): UserDetailRequest => {
    return {
        type: constants.DETAIL_USER_REQUEST,
        payload,
    }
}

export const detailUserSuccess = (payload: DetailUserSuccessPayload): UserDetailSuccess => {
    return {
        type: constants.DETAIL_USER_SUCCESS,
        payload,
    }
}

export const detailUserError = (payload: DetailUserErrorPayload): UserDetailError => {
    return {
        type: constants.DETAIL_USER_ERROR,
        payload,
    }
}

// EDIT
export const editUserRequest = (payload: EditUserPayload): EditUserRequest => {
    return {
        type: constants.EDIT_USER_REQUEST,
        payload,
    }
}

export const editUserSuccess = (payload: EditUserSuccessPayload): EditUserSuccess => {
    return {
        type: constants.EDIT_USER_SUCCESS,
        payload,
    }
}

export const editUserError = (payload: EditUserErrorPayload): EditUserError => {
    return {
        type: constants.EDIT_USER_ERROR,
        payload,
    }
}

// DELETE
export const deleteUserRequest = (payload: DeleteUserPayload): DeleteUserRequest => {
    return {
        type: constants.DELETE_USER_REQUEST,
        payload,
    }
}

export const deleteUserSuccess = (payload: DeleteUserSuccessPayload): DeleteUserSuccess => {
    return {
        type: constants.DELETE_USER_SUCCESS,
        payload,
    }
}

export const deleteUserError = (payload: DeleteUserErrorPayload): DeleteUserError => {
    return {
        type: constants.DELETE_USER_ERROR,
        payload,
    }
}
