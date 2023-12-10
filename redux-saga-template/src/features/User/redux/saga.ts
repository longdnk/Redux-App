import { call, all, put, delay, takeLatest } from 'redux-saga/effects'
import { appApi } from "@api";
import { AxiosResponse } from "axios";
import {
    addUserError,
    addUserSuccess, deleteUserError,
    deleteUserSuccess,
    detailUserError,
    detailUserSuccess,
    editUserError,
    editUserSuccess,
    userError,
    userSuccess
} from "./actions";
import {
    AddUserErrorPayload,
    DeleteUserErrorPayload,
    DetailUserErrorPayload,
    EditUserErrorPayload,
    UserErrorPayload
} from "@features/User/redux/payload";
import * as constants from "./constants";
import { AddUserAction, DeleteUserAction, DetailUserAction, EditUserAction, User } from "@features/User/redux/type";
import userTable from "@features/User/SubComponents/UserTable/UserTable";

const getUser = async () => {
    return await appApi.get('users');
}

function* getUserSaga() {
    try {
        yield delay(1000);
        const response: AxiosResponse = yield call(getUser);
        yield put(userSuccess(response.data));
    }
    catch (e: any) {
        const item = e as UserErrorPayload;
        yield put(userError(item));
    }
}

const addUser = async (data: Omit<User, 'id'>) => {
    return await appApi.post('users', data);
}

function* addUserSaga(action: AddUserAction) {
    try {
        yield delay(1000);
        yield call(addUser, action.payload.data);
        yield put(addUserSuccess({ message: 'Add success' }));
        yield call(action.payload.callback);
    }
    catch (e: any) {
        const item = e as AddUserErrorPayload;
        yield put(addUserError(item));
    }
}

const detailUser = async (id: string | number) => {
    return await appApi.get(`users/${id}/`);
}

function* detailUserSaga(action: DetailUserAction) {
    try {
        yield delay(1000);
        const response: AxiosResponse = yield call(detailUser, action.payload);
        yield put(detailUserSuccess(response.data));
    }
    catch (e: any) {
        const item = e as DetailUserErrorPayload;
        yield put(detailUserError(item));
    }
}

const editUser = async (id: string | number, data: Partial<User>) => {
    return await appApi.put(`users/${id}`, data);
}

function* editUserSaga(action: EditUserAction) {
    try {
        yield delay(1000);
        yield call(editUser, action.payload.id, action.payload.data);
        yield put(editUserSuccess({ message: 'Edit user success' }));
        yield call(action.payload.callback);
    }
    catch (e: any) {
        const item = e as EditUserErrorPayload;
        yield put(editUserError(item));
    }
}

const deleteUser = async (id: string | number) => {
    return await appApi.delete(`users/${id}`);
}

function* deleteUserSaga(action: DeleteUserAction) {
    try {
        yield delay(1000);
        yield call(deleteUser, action.payload.id);
        yield put(deleteUserSuccess({ message: 'Delete user success' }));
        yield call(action.payload.callback);
    }
    catch (e: any) {
        const item = e as DeleteUserErrorPayload;
        yield put(deleteUserError(item));
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(constants.GET_USER_REQUEST, getUserSaga),
        takeLatest(constants.ADD_USER_REQUEST, addUserSaga),
        takeLatest(constants.DETAIL_USER_REQUEST, detailUserSaga),
        takeLatest(constants.EDIT_USER_REQUEST, editUserSaga),
        takeLatest(constants.DELETE_USER_REQUEST, deleteUserSaga),
    ])
}