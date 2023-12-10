import { UserState } from "./type";

export const initialState: UserState = {
    list: {
        data: [],
        loading: false,
    },
    add: {
        error: {},
        pending: false,
    },
    detail: {
        data: {},
        loading: false,
    },
    edit: {
        error: {},
        pending: false,
    },
    delete: {
        error: {},
        pending: false,
    }
}