import { all, put, call, delay, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from "axios";
import { categoryApi } from "./categoryApi";
import { categoryError, categoryRequest, categorySuccess } from "./categorySlice";

function* getCategory() {
	try {
		yield delay(1000);
		const response: AxiosResponse = yield call(categoryApi.get, 'categories');
		yield put(categorySuccess(response.data));
	} catch (e: any) {
		yield put(categoryError(e));
	}
}

export default function* categorySaga() {
	yield all([
		takeLatest(categoryRequest, getCategory),
	])
}