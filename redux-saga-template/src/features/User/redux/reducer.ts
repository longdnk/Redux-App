import { initialState } from './initialState';
import { UserState } from "./type";
import { UserAction } from "./actionTypes";
import * as constants from './constants';

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
        default:
            return {
                ...state,
            }
    }
}