import { productApi } from "./productApi";
import { all, put, call, delay, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from "axios";
import {
	addProductError,
	addProductRequest,
	addProductSuccess,
	deleteProductError, deleteProductRequest,
	deleteProductSuccess,
	detailProductError,
	detailProductRequest,
	detailProductSuccess,
	editProductError, editProductRequest,
	editProductSuccess,
	getProductError,
	getProductRequest,
	getProductSuccess
} from "./productSlice";
import { DetailProduct, ProductAdd, ProductDelete, ProductEdit, ProductFetch } from "./type";
import { appApi } from "@api";

function* getProduct(action: ProductFetch) {
	try {
		yield delay(1000);
		const response: AxiosResponse = yield call(productApi.get, 'products', action.payload);
		yield put(getProductSuccess(response.data));
	} catch (e: any) {
		yield put(getProductError(e));
	}
}

function* addProduct(action: ProductAdd) {
	try {
		yield delay(1000);
		yield call(productApi.post, 'products', action.payload.data);
		yield put(addProductSuccess());
		yield call(action.payload.callback);
	} catch (e: any) {
		yield put(addProductError(e));
	}
}

function* detailProduct(action: DetailProduct) {
	try {
		yield delay(1000);
		const response: AxiosResponse = yield call(appApi.get, `products/${action.payload}`);
		yield put(detailProductSuccess(response.data));
	} catch (e: any) {
		yield put(detailProductError(e));
	}
}

function* editProduct(action: ProductEdit) {
	try {
		yield delay(1000);
		yield call(appApi.put, `products/${action.payload.id}`, action.payload.data);
		yield put(editProductSuccess());
		yield call(action.payload.callback);
	} catch (e: any) {
		yield put(editProductError(e));
	}
}

function* deleteProduct(action: ProductDelete) {
	try {
		yield delay(1000);
		yield call(appApi.delete, `products/${action.payload.id}`);
		yield put(deleteProductSuccess());
		yield call(action.payload.callback);
	} catch (e: any) {
		yield put(deleteProductError(e));
	}
}

export default function* productSaga() {
	yield all([
		takeLatest(getProductRequest, getProduct),
		takeLatest(addProductRequest, addProduct),
		takeLatest(detailProductRequest, detailProduct),
		takeLatest(editProductRequest, editProduct),
		takeLatest(deleteProductRequest, deleteProduct),
	])
}