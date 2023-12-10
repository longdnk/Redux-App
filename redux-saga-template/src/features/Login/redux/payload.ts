import { LoginData } from "./type";

export type LoginPayload = {
    data: LoginData;
    callback: () => void;
}

export type LoginSuccessPayload = {
    access_token: string;
    refresh_token: string;
}

export type LoginErrorPayload = PayloadError;

export type PayloadError = {
    response: {
        config: object;
        data: {
            message: string;
            statusCode: number;
        }
        headers: object;
        request: object;
        status: number;
        statusText: string;
    }
}