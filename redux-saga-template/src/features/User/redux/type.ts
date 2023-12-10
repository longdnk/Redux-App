export type UserState = {
    list: {
        data: User[];
        loading: boolean;
    },
    add: {
        error: {},
        pending: boolean;
    },
    detail: {
        data: Partial<User>;
        loading: boolean;
    },
    edit: {
        error: {},
        pending: boolean,
    },
    delete: {
        error: {},
        pending: boolean,
    }
}

export type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
}

export type AddUserAction = {
    type: string;
    payload: {
        data: Omit<User, 'id'>;
        callback: () => void;
    }
}

export type DetailUserAction = {
    type: string;
    payload: string | number;
}

export type EditUserAction = {
    type: string;
    payload: {
        id: string | number;
        data: Partial<User>;
        callback: () => void;
    }
}

export type DeleteUserAction = {
    type: string;
    payload: {
        id: string | number;
        callback: () => void;
    }
}
