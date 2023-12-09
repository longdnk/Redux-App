import initialState from "./initialState";
import * as actionType from "./constants";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        // GET USER
        case actionType.GET_USER_REQUEST:
            return {
                ...state,
                userList: {
                    ...state.userList,
                    loading: true,
                }
            }
        case actionType.GET_USER_SUCCESS:
            return {
                ...state,
                userList: {
                    ...state.userList,
                    data: action.payload,
                    loading: false,
                }
            }
        case actionType.GET_USER_ERROR:
            return {
                ...state,
                userList: {
                    ...state.userList,
                    loading: false,
                }
            }

        // ADD USER
        case actionType.ADD_USER_REQUEST:
            return {
                ...state,
                userAdd: {
                    ...state.userAdd,
                    pending: true,
                }
            }
        case actionType.ADD_USER_SUCCESS:
            return {
                ...state,
                userAdd: {
                    ...state.userAdd,
                    pending: false,
                }
            }
        case actionType.ADD_USER_ERROR:
            return {
                ...state,
                userAdd: {
                    ...state.userAdd,
                    pending: false,
                }
            }

        // GET USER DETAIL
        case actionType.DETAIL_USER_REQUEST:
            return {
                ...state,
                userDetail: {
                    ...state.userDetail,
                    loading: true,
                }
            }
        case actionType.DETAIL_USER_SUCCESS:
            return {
                ...state,
                userDetail: {
                    ...state.userDetail,
                    data: action.payload,
                    loading: false,
                }
            }
        case actionType.DETAIL_USER_ERROR:
            return {
                ...state,
                userDetail: {
                    ...state.userDetail,
                    loading: false,
                }
            }

        // EDIT USER
        case actionType.EDIT_USER_REQUEST:
            return {
                ...state,
                userEdit: {
                    ...state.userEdit,
                    pending: true,
                }
            }
        case actionType.EDIT_USER_SUCCESS:
            return {
                ...state,
                userEdit: {
                    ...state.userEdit,
                    pending: false,
                }
            }
        case actionType.EDIT_USER_ERROR:
            return {
                ...state,
                userEdit: {
                    ...state.userEdit,
                    pending: false,
                }
            }

        // DELETE USER
        case actionType.DELETE_USER_REQUEST:
            return {
                ...state,
                userDelete: {
                    ...state.userDelete,
                    pending: true,
                }
            }
        case actionType.DELETE_USER_SUCCESS:
            return {
                ...state,
                userDelete: {
                    ...state.userDelete,
                    pending: false,
                }
            }
        case actionType.DELETE_USER_ERROR:
            return {
                ...state,
                userDelete: {
                    ...state.userDelete,
                    pending: false,
                }
            }

        default:
            return state;
    }
}