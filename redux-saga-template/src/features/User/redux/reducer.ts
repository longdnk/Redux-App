import { initialState } from './initialState';
import { UserState } from "./type";
import { UserAction } from "./actionTypes";
import * as constants from './constants';
import { pushNotification } from "@helper";

export const reducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        // GET USER
        case constants.GET_USER_REQUEST:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                }
            }
        case constants.GET_USER_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.payload,
                    loading: false,
                }
            }
        case constants.GET_USER_ERROR:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                }
            }

        // ADD USER
        case constants.ADD_USER_REQUEST:
            return {
                ...state,
                add: {
                    ...state.add,
                    pending: true,
                }
            }
        case constants.ADD_USER_SUCCESS:
            pushNotification({ type: 'success', message: action.payload.message });
            return {
                ...state,
                add: {
                    ...state.add,
                    pending: false,
                    error: {},
                }
            }
        case constants.ADD_USER_ERROR:
            pushNotification({ type: 'success', message: action.payload.response.data.message ?? action.payload.message });
            return {
                ...state,
                add: {
                    ...state.add,
                    pending: false,
                    error: action.payload.error,
                }
            }

        // DETAIL USER
        case constants.DETAIL_USER_REQUEST:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                }
            }
        case constants.DETAIL_USER_SUCCESS:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    data: action.payload,
                    loading: false,
                }
            }
        case constants.DETAIL_USER_ERROR:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                }
            }

        // EDIT USER
        case constants.EDIT_USER_REQUEST:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    pending: true,
                }
            }
        case constants.EDIT_USER_SUCCESS:
            pushNotification({ type: 'success', message: action.payload.message });
            return {
                ...state,
                edit: {
                    ...state.edit,
                    pending: false,
                    error: {},
                }
            }
        case constants.EDIT_USER_ERROR:
            pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
            return {
                ...state,
                edit: {
                    ...state.edit,
                    pending: false,
                    error: action.payload.error,
                }
            }

        // DELETE USER
        case constants.DELETE_USER_REQUEST:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    pending: true,
                }
            }
        case constants.DELETE_USER_SUCCESS:
            pushNotification({ type: 'success', message: action.payload.message });
            return {
                ...state,
                delete: {
                    ...state.delete,
                    pending: false,
                    error: action.payload.error,
                }
            }
        case constants.DELETE_USER_ERROR:
            pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
            return {
                ...state,
                delete: {
                    ...state.delete,
                    pending: false,
                    error: {},
                }
            }
        default:
            return {
                ...state,
            }
    }
}