import { all, put, call, delay, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from "axios";
import { categoryApi } from "./categoryApi";
import {
	addCategoryError, addCategoryRequest,
	addCategorySuccess,
	categoryError,
	categoryRequest,
	categorySuccess, deleteCategoryError, deleteCategoryRequest, deleteCategorySuccess,
	detailCategoryError, detailCategoryRequest,
	detailCategorySuccess, editCategoryError, editCategoryRequest, editCategorySuccess
} from "./categorySlice";
import { CategoryAdd, CategoryDelete, CategoryEdit, DetailCategory } from "./type";

function* getCategory() {
	try {
		yield delay(1000);
		const response: AxiosResponse = yield call(categoryApi.get, 'categories');
		yield put(categorySuccess(response.data));
	}
	catch (e: any) {
		yield put(categoryError(e));
	}
}

function* detailCategory(action: DetailCategory) {
	try {
		yield delay(1000);
		const response: AxiosResponse = yield call(categoryApi.get, `categories/${action.payload}`);
		yield put(detailCategorySuccess(response.data));
	}
	catch (e: any) {
		yield put(detailCategoryError(e));
	}
}

function* addCategory(action: CategoryAdd) {
	try {
		yield delay(1000);
		yield call(categoryApi.post, 'categories', action.payload.data);
		yield put(addCategorySuccess());
		yield call(action.payload.callback);
	}
	catch (e: any) {
		yield put(addCategoryError(e));
	}
}

function* editCategory(action: CategoryEdit) {
	try {
		yield delay(1000);
		yield call(categoryApi.put, `categories/${action.payload.id}`, action.payload.data);
		yield put(editCategorySuccess());
		yield call(action.payload.callback);
	}
	catch (e: any) {
		yield put(editCategoryError(e));
	}
}

function* deleteCategory(action: CategoryDelete) {
	try {
		yield delay(1000);
		yield call(categoryApi.delete, `categories/${action.payload.id}`);
		yield put(deleteCategorySuccess());
		yield call(action.payload.callback);
	}
	catch (e: any) {
		yield put(deleteCategoryError(e));
	}
}

export default function* categorySaga() {
	yield all([
		takeLatest(categoryRequest, getCategory),
		takeLatest(detailCategoryRequest, detailCategory),
		takeLatest(addCategoryRequest, addCategory),
		takeLatest(editCategoryRequest, editCategory),
		takeLatest(deleteCategoryRequest, deleteCategory),
	])
}