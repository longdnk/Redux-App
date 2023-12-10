import { call, all, put, delay, takeLatest } from 'redux-saga/effects'
import { appApi } from "@api";
import { AxiosResponse } from "axios";
import { userError, userSuccess } from "./actions";
import { UserErrorPayload } from "@features/User/redux/payload";
import * as constants from "./constants";

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

export default function* userSaga() {
    yield all([
        takeLatest(constants.GET_USER_REQUEST, getUserSaga),
    ])
}