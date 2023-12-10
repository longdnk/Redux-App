import { PayloadError } from "@features/Login/redux/payload";
import { User } from './type';
import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";

export type UserRequestPayload = null;

export type UserSuccessPayload = {
    data: User[];
}

export type UserErrorPayload = PayloadError;

// ADD
export type AddUserPayload = {
    data: Omit<User, 'id'>;
    callback: () => void;
}

export type AddUserSuccessPayload = {
    message: string;
}

export type AddUserErrorPayload = {
    error: string | null;
}

// DETAIL
export type DetailUserPayload = string | number;

export type DetailUserSuccessPayload = {
    data: User;
}

export type DetailUserErrorPayload = {
    error: string | null;
}

// EDIT
export type EditUserPayload = {
    id: string | number;
    data: Partial<User>;
    callback: () => void;
}

export type EditUserSuccessPayload = {
    message: string;
}

export type EditUserErrorPayload = {
    error: string | null;
}

// DELETE
export type DeleteUserPayload = {
    id: string | number;
    callback: () => void;
}

export type DeleteUserSuccessPayload = {
    message: string;
}

export type DeleteUserErrorPayload = {
    error: string | null;
}