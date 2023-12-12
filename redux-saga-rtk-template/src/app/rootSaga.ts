import { all, fork } from 'redux-saga/effects';
import loginSaga from "@features/Login/redux/loginSaga";
import productSaga from "@features/Product/redux/productSaga";
import categorySaga from "@features/Categories/redux/categorySaga";

export default function* rootSaga() {
	yield all([
		fork(loginSaga),
		fork(productSaga),
		fork(categorySaga),
	])
}