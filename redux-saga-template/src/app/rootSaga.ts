import { all, fork } from 'redux-saga/effects';
import authSaga from "@features/Login/redux/saga";
import userSaga from "@features/User/redux/saga";

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(userSaga),
    ]);
}
