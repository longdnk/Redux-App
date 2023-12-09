export type AuthState = {
    auth: {
        pending: boolean;
    }
}

export type LoginPayload = {
    data: LoginData;
    callback: () => void;
}

export type LoginData = {
    username: string;
    password: string;
}

export type LoginError = {
    error: string;
}

export type LoginSuccess = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
}
