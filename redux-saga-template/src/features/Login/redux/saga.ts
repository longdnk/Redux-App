import { LoginAction, LoginData } from "./type";
import { appApi } from "@api";
import { put, call, all, delay, takeLatest } from 'redux-saga/effects'
import * as constants from './constants';
import { AxiosResponse } from "axios";
import { loginError, loginSuccess } from "./actions";
import { setToken } from "@helper";
import { LoginErrorPayload, LoginSuccessPayload } from "@features/Login/redux/payload";

const login = async (payload: LoginData) => {
    return await appApi.post('auth/login', payload);
}

function* loginSaga(action: LoginAction) {
    try {
        yield delay(1000);
        const response: AxiosResponse = yield call(login, action.payload.data);
        yield put(loginSuccess(response.data));
        const result = response.data as LoginSuccessPayload;
        yield call(setToken, {
            name: action.payload.data.email,
            id: action.payload.data.password,
            token: result.access_token,
        });
        yield call(action.payload.callback);
    }
    catch (e: any) {
        const item = e as LoginErrorPayload;
        yield put(loginError(item));
    }
}

export default function* authSaga() {
    yield all([
        takeLatest(constants.LOGIN_REQUEST, loginSaga),
    ])
}