import * as actionType from './constant';
import { api } from "../../../api";
import { pushNotification, setToken } from "../../../helper/helper";

export const loginUser = value => {

    return dispatch => {
        dispatch(loginRequest());
        setTimeout(() => {
            api.get('account')
                .then(res => res.data)
                .then(data => {
                    let isExist = false;
                    data?.map(element => {
                        const checkNameOk = element.name === value.name;
                        const checkPasswordOk = element.password === value.password;

                        if (checkNameOk && checkPasswordOk) {
                            setToken({
                                name: element.name,
                                password: element.password,
                                token: element.token,
                            });
                            isExist = true;
                            pushNotification({ type: 'success', message: "Login Success" });
                            return dispatch(loginSuccess());
                        }
                    });
                    if (!isExist) {
                        pushNotification({ type: 'error', message: "Login Error" });
                        return dispatch(loginError());
                    }
                })
                .catch(e => {
                    dispatch(loginError());
                    pushNotification({ type: 'error', message: e.message ?? "Login Failed" });
                });
        }, 1000);
    }
}
const loginRequest = () => {
    return {
        type: actionType.LOGIN_REQUEST,
        payload: null,
    }
}

const loginSuccess = () => {
    return {
        type: actionType.LOGIN_SUCCESS,
        payload: null,
    }
}

const loginError = () => {
    return {
        type: actionType.LOGIN_ERROR,
        payload: null,
    }
}