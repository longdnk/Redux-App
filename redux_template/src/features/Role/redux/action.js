import { api } from "../../../api";
import * as actionType from './constants';
import { pushNotification } from "../../../helper/helper";

// GET ROLE
export const getRole = () => {
    return dispatch => {
        dispatch(getRoleRequest());
        setTimeout(() => {
            api.get('role').then(res => {
                dispatch(getRoleSuccess(res));
            }).catch(e => {
                dispatch(getRoleError());
                pushNotification({ type: 'error', message: e.message ?? e.response.data.message });
            })
        }, 1000)
    }
}

const getRoleRequest = () => {
    return {
        type: actionType.GET_ROLE_REQUEST,
        payload: null,
    }
}

const getRoleSuccess = res => {
    return {
        type: actionType.GET_ROLE_SUCCESS,
        payload: res.data,
    }
}

const getRoleError = () => {
    return {
        type: actionType.GET_ROLE_ERROR,
        payload: null,
    }
}

// GET ROLE DETAIL
export const getRoleDetail = id => {
    return dispatch => {
        dispatch(getRoleDetailRequest());
        setTimeout(() => {
            api.get(`role/${id}`).then(res => {
                dispatch(getRoleDetailSuccess(res));
            }).catch(e => {
                dispatch(getRoleDetailError());
                pushNotification({ type: 'error', message: e.message ?? e.response.data.message });
            })
        }, 1000)
    }
}

const getRoleDetailRequest = () => {
    return {
        type: actionType.DETAIL_ROLE_REQUEST,
        payload: null,
    }
}

const getRoleDetailSuccess = res => {
    return {
        type: actionType.DETAIL_ROLE_SUCCESS,
        payload: res.data,
    }
}

const getRoleDetailError = () => {
    return {
        type: actionType.DETAIL_ROLE_ERROR,
        payload: null,
    }
}

// ADD ROLE
export const addRole = roleData => {
    const { callback, data } = roleData;
    return dispatch => {
        dispatch(addRoleRequest());
        setTimeout(() => {
            api.post('role', data).then(res => {
                dispatch(addRoleSuccess());
                pushNotification({ type: 'success', message: 'Add success' });
                callback();
            }).catch(e => {
                dispatch(addRoleError());
                pushNotification({ type: 'error', message: e?.response?.data?.message ?? e.message });
            })
        }, 1000);
    }
}

const addRoleRequest = () => {
    return {
        type: actionType.ADD_ROLE_REQUEST,
        payload: null,
    }
}

const addRoleSuccess = () => {
    return {
        type: actionType.ADD_ROLE_SUCCESS,
        payload: null,
    }
}

const addRoleError = () => {
    return {
        type: actionType.ADD_ROLE_ERROR,
        payload: null,
    }
}

// EDIT ROLE
export const editRole = roleData => {
    const { callback, data, id } = roleData;
    return dispatch => {
        dispatch(editRoleRequest());
        setTimeout(() => {
            api.post(`role/${id}`, data).then(res => {
                dispatch(editRoleSuccess());
                pushNotification({ type: 'success', message: 'Edit role success' });
                callback();
            }).catch(e => {
                dispatch(editRoleError());
                pushNotification({ type: 'error', message: e.message ?? e.response.data.message });
            })
        }, 1000)
    }
}

const editRoleRequest = () => {
    return {
        type: actionType.EDIT_ROLE_REQUEST,
        payload: null,
    }
}

const editRoleSuccess = () => {
    return {
        type: actionType.EDIT_ROLE_SUCCESS,
        payload: null,
    }
}

const editRoleError = () => {
    return {
        type: actionType.EDIT_ROLE_ERROR,
        payload: null,
    }
}

export const deleteRole = userData => {
    const { callback, id } = userData;
    return dispatch => {
        dispatch(deleteRoleRequest());
        setTimeout(() => {
            api.delete(`role/${id}`).then(res => {
                dispatch(deleteRoleSuccess());
                pushNotification({ type: 'success', message: 'Delete role success' });
                callback();
            }).catch(e => {
                dispatch(deleteRoleError());
                pushNotification({ type: 'error', message: e.message ?? e.response.data.message });
            })
        }, 1000)
    }
}

const deleteRoleRequest = () => {
    return {
        type: actionType.DELETE_ROLE_REQUEST,
        payload: null,
    }
}

const deleteRoleSuccess = () => {
    return {
        type: actionType.DELETE_ROLE_SUCCESS,
        payload: null,
    }
}

const deleteRoleError = () => {
    return {
        type: actionType.DELETE_ROLE_ERROR,
        payload: null,
    }
}
