export type UserState = {
    userList: {
        data: User[];
        loading: boolean;
    }
    add: {
        pending: boolean;
        error: {};
    },
    detail: {
        data: Partial<User>;
        loading: boolean;
    },
    edit: {
        pending: boolean;
        error: {};
    },
    delete: {
        pending: boolean;
        error: {};
    }
}

export type UserResponse = {
    users: [];
    total: number;
    skip: number;
    limit: number;
}

export type User = {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: 'male' | 'female;'
}

export type UserAdd = {
    data: Omit<User, 'id'>;
    callback: () => void;
}

export type UserEdit = {
    id: number;
    data: Omit<User, 'id'>;
    callback: () => void;
}

export type UserDelete = {
    id: number;
    callback: () => void;
}
