export type UserState = {
    list: {
        data: User[];
        loading: boolean;
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