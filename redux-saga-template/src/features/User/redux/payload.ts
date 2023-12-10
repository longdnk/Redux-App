import { PayloadError } from "@features/Login/redux/payload";
import { User } from './type';

export type UserRequestPayload = null;

export type UserSuccessPayload = {
    data: User[];
}

export type UserErrorPayload = PayloadError;