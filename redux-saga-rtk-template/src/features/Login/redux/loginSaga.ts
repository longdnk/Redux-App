import { all, put, call, delay, takeLatest } from 'redux-saga/effects';
import { loginError, loginRequest, loginSuccess } from "./loginSlice";
import { LoginAction } from "./type";
import { AxiosResponse } from "axios";
import { loginApi } from "./loginApi";

function* login(action: LoginAction) {
	try {
		yield delay(1000);
		const response: AxiosResponse = yield call(loginApi.login, action.payload.data);
		yield put(loginSuccess({
			name: action.payload.data.email,
			token: response.data.access_token,
			id: action.payload.data.password,
		}));
		yield call(action.payload.callback);
	} catch (e: any) {
		yield put(loginError(e));
	}
}

export default function* loginSaga() {
	yield all([
		takeLatest(loginRequest, login),
	])
}