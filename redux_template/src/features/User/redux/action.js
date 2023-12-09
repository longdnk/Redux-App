import * as actionType from './constants';
import { api } from "../../../api";
import { pushNotification } from "../../../helper/helper";

// GET USER
export const getUser = () => {
    return dispatch => {
        dispatch(getUserRequest());
        setTimeout(() => {
            api.get('account').then(res => {
                dispatch(getUserSuccess(res));
            }).catch(e => {
                dispatch(getUserError());
                pushNotification({ type: 'error', message: e.message })
            })
        }, 1000)
    }
}
const getUserRequest = () => {
    return {
        type: actionType.GET_USER_REQUEST,
        payload: null,
    }
}

const getUserSuccess = res => {
    return {
        type: actionType.GET_USER_SUCCESS,
        payload: res.data,
    }
}

const getUserError = () => {
    return {
        type: actionType.GET_USER_REQUEST,
        payload: null,
    }
}

// ADD USER
export const addUser = userData => {
    const { callback, data } = userData;
    return dispatch => {
        dispatch(addUserRequest());
        setTimeout(() => {
            api.post('account', data).then(res => {
                dispatch(addUserSuccess());
                pushNotification({ type: 'success', message: 'Add success' });
                callback();
            }).catch(e => {
                dispatch(addUserError());
                pushNotification({ type: 'error', message: e?.response?.data?.message ?? e.message });
            })
        }, 1000);
    }
}

const addUserRequest = () => {
    return {
        type: actionType.ADD_USER_REQUEST,
        payload: null,
    }
}

const addUserSuccess = () => {
    return {
        type: actionType.ADD_USER_SUCCESS,
        payload: null,
    }
}

const addUserError = () => {
    return {
        type: actionType.ADD_USER_ERROR,
        payload: null,
    }
}

export const getUserDetail = id => {
    return dispatch => {
        dispatch(getUserDetailRequest());
        setTimeout(() => {
            api.get(`account/${id}`).then(res => {
                dispatch(getUserDetailSuccess(res));
            }).catch(e => {
                dispatch(getUserDetailError());
                pushNotification({ type: 'error', message: e.message })
            })
        }, 1000);
    }
}

const getUserDetailRequest = () => {
    return {
        type: actionType.DETAIL_USER_REQUEST,
        payload: null,
    }
}

const getUserDetailSuccess = res => {
    return {
        type: actionType.DETAIL_USER_SUCCESS,
        payload: res.data,
    }
}

const getUserDetailError = () => {
    return {
        type: actionType.DETAIL_USER_ERROR,
        payload: null,
    }
}

// EDIT USER
export const editUser = userData => {
    const { callback, data, id } = userData;
    return dispatch => {
        dispatch(editUserRequest());
        setTimeout(() => {
            api.put(`account/${id}`, data).then(res => {
                dispatch(editUserSuccess());
                pushNotification({ type: 'success', message: 'Edit success' });
                callback();
            }).catch(e => {
                dispatch(editUserError());
                pushNotification({ type: 'error', message: e.message ?? e?.response?.data?.message });
            })
        }, 1000);
    }
}

const editUserRequest = () => {
    return {
        type: actionType.EDIT_USER_REQUEST,
        payload: null,
    }
}

const editUserSuccess = () => {
    return {
        type: actionType.EDIT_USER_SUCCESS,
        payload: null,
    }
}

const editUserError = () => {
    return {
        type: actionType.EDIT_USER_ERROR,
        payload: null,
    }
}

// DELETE USER
export const deleteUser = userData => {

    const { callback, id } = userData;

    return dispatch => {
        dispatch(deleteUserRequest());
        setTimeout(() => {
            api.delete(`account/${id}`).then(res => {
                dispatch(deleteUserSuccess());
                pushNotification({ type: 'success', message: 'Delete success' });
                callback();
            }).catch(e => {
                dispatch(deleteUserError());
                pushNotification({ type: 'error', message: e?.response?.data?.message ?? e.message });
            })
        }, 1000);
    }
}

const deleteUserRequest = () => {
    return {
        type: actionType.DELETE_USER_REQUEST,
        payload: null,
    }
}

const deleteUserSuccess = () => {
    return {
        type: actionType.DELETE_USER_SUCCESS,
        payload: null,
    }
}

const deleteUserError = () => {
    return {
        type: actionType.DELETE_USER_ERROR,
        payload: null,
    }
}