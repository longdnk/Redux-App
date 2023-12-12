import { all, fork } from 'redux-saga/effects';
import loginSaga from "@features/Login/redux/loginSaga";

export default function* rootSaga() {
	yield all([
		fork(loginSaga),
	])
}