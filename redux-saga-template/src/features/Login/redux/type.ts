export type AuthState = {
    pending: boolean;
    data: {
        access_token: string;
        refresh_token: string;
    }
    error: string | null,
}

export type LoginData = {
    email: string;
    password: string;
}

export type LoginAction = {
    payload: {
        callback: () => void;
        data: LoginData;
    }
    type: string;
}

export type UserToken = {
    name: string;
    id: string;
    token: string;
}