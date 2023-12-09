import initialState from "./initialState";
import * as actionType from "./constant";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_REQUEST:
            return {
                ...state,
                loginInfo: {
                    ...state.loginInfo,
                    pending: true,
                },
            }
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                loginInfo: {
                    ...state.loginInfo,
                    pending: false,
                    data: action.payload,
                }
            }
        case actionType.LOGIN_ERROR:
            return {
                ...state,
                loginInfo: {
                    ...state.loginInfo,
                    pending: false
                }
            }

        default:
            return state;
    }
}