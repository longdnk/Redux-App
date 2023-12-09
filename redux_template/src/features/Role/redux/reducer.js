import initialState from "./initialState";
import * as actionType from "./constants";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        // GET ROLE
        case actionType.GET_ROLE_REQUEST:
            return {
                ...state,
                roleList: {
                    ...state.roleList,
                    loading: true,
                }
            }
        case actionType.GET_ROLE_SUCCESS:
            return {
                ...state,
                roleList: {
                    ...state.roleList,
                    data: action.payload,
                    loading: false
                }
            }
        case actionType.GET_ROLE_ERROR:
            return {
                ...state,
                roleList: {
                    ...state.roleList,
                    loading: false,
                }
            }

        // GET ROLE DETAIL
        case actionType.DETAIL_ROLE_REQUEST:
            return {
                ...state,
                roleDetail: {
                    ...state.roleDetail,
                    loading: true,
                }
            }
        case actionType.DETAIL_ROLE_SUCCESS:
            return {
                ...state,
                roleDetail: {
                    ...state.roleDetail,
                    data: action.payload,
                    loading: false,
                }
            }
        case actionType.DETAIL_ROLE_ERROR:
            return {
                ...state,
                roleDetail: {
                    ...state.roleList,
                    loading: false,
                }
            }

        // ADD ROLE
        case actionType.ADD_ROLE_REQUEST:
            return {
                ...state,
                roleAdd: {
                    ...state.roleAdd,
                    pending: true,
                }
            }
        case actionType.ADD_ROLE_SUCCESS:
            return {
                ...state,
                roleAdd: {
                    ...state.roleAdd,
                    pending: false,
                }
            }
        case actionType.ADD_ROLE_ERROR:
            return {
                ...state,
                roleAdd: {
                    ...state.roleAdd,
                    pending: false,
                }
            }

        // DELETE ROLE
        case actionType.DELETE_ROLE_REQUEST:
            return {
                ...state,
                roleDelete: {
                    ...state.roleDelete,
                    pending: true,
                }
            }
        case actionType.DELETE_ROLE_SUCCESS:
            return {
                ...state,
                roleDelete: {
                    ...state.roleDelete,
                    pending: false,
                }
            }
        case actionType.DELETE_ROLE_ERROR:
            return {
                ...state,
                roleDelete: {
                    ...state.roleDelete,
                    pending: false,
                }
            }

        //  EDIT ROLE
        case actionType.EDIT_ROLE_REQUEST:
            return {
                ...state,
                roleDetail: {
                    ...state.roleDetail,
                    loading: true,
                }
            }
        case actionType.EDIT_ROLE_SUCCESS:
            return {
                ...state,
                roleDetail: {
                    ...state.roleDetail,
                    data: action.payload,
                    loading: false,
                }
            }
        case actionType.EDIT_ROLE_ERROR:
            return {
                ...state,
                roleDetail: {
                    ...state.roleDetail,
                    loading: false,
                }
            }

        default:
            return state;
    }
}