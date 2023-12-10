import * as constants from "./constants";
import {
    AddUserErrorPayload,
    AddUserPayload,
    AddUserSuccessPayload, DeleteUserErrorPayload, DeleteUserPayload, DeleteUserSuccessPayload, DetailUserErrorPayload,
    DetailUserPayload, DetailUserSuccessPayload, EditUserErrorPayload, EditUserPayload, EditUserSuccessPayload,
    UserErrorPayload,
    UserRequestPayload,
    UserSuccessPayload
} from "./payload";
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

export type AddUserRequest = {
    type: typeof constants.ADD_USER_REQUEST,
    payload: AddUserPayload,
}

export type AddUserSuccess = {
    type: typeof constants.ADD_USER_SUCCESS,
    payload: AddUserSuccessPayload,
}

export type AddUserError = {
    type: typeof constants.ADD_USER_ERROR,
    payload: AddUserErrorPayload,
}

export type UserDetailRequest = {
    type: typeof constants.DETAIL_USER_REQUEST,
    payload: DetailUserPayload,
}

export type UserDetailSuccess = {
    type: typeof constants.DETAIL_USER_SUCCESS,
    payload: DetailUserSuccessPayload,
}

export type UserDetailError = {
    type: typeof constants.DETAIL_USER_ERROR,
    payload: DetailUserErrorPayload,
}

export type EditUserRequest = {
    type: typeof constants.EDIT_USER_REQUEST,
    payload: EditUserPayload,
}

export type EditUserSuccess = {
    type: typeof constants.EDIT_USER_SUCCESS,
    payload: EditUserSuccessPayload,
}

export type EditUserError = {
    type: typeof constants.EDIT_USER_ERROR,
    payload: EditUserErrorPayload,
}

export type DeleteUserRequest = {
    type: typeof constants.DELETE_USER_REQUEST,
    payload: DeleteUserPayload,
}

export type DeleteUserSuccess = {
    type: typeof constants.DELETE_USER_SUCCESS,
    payload: DeleteUserSuccessPayload,
}

export type DeleteUserError = {
    type: typeof constants.DELETE_USER_ERROR,
    payload: DeleteUserErrorPayload,
}

export type UserGet = UserRequest | UserSuccess | UserError;

export type UserAdd = AddUserRequest | AddUserSuccess | AddUserError;

export type UserDetail = UserDetailRequest | UserDetailSuccess | UserDetailError;

export type UserEdit = EditUserRequest | EditUserSuccess | EditUserError;

export type UserDelete = DeleteUserRequest | DeleteUserSuccess | DeleteUserError;

export type UserAction = AnyAction | UserGet | UserAdd | UserDetail | UserEdit | UserDelete;