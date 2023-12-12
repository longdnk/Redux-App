import { Category, CategoryAddPayload, CategoryDeletePayload, CategoryEditPayload, CategoryState } from "./type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PayloadError, pushNotification } from "@helper";

const initialState: CategoryState = {
	list: {
		data: [],
		loading: false,
	},
	detail: {
		data: {},
		loading: false,
	},
	add: {
		pending: false,
		error: '',
	},
	edit: {
		pending: false,
		error: '',
	},
	delete: {
		pending: false,
		error: '',
	}
}

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		categoryRequest: state => {
			state.list.loading = true;
		},
		categorySuccess: (state, action: PayloadAction<Category[]>) => {
			state.list.loading = false;
			state.list.data = action.payload;
		},
		categoryError: (state, action: PayloadAction<PayloadError>) => {
			state.list.loading = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		detailCategoryRequest: (state, action: PayloadAction<string>) => {
			state.detail.loading = true;
		},
		detailCategorySuccess: (state, action: PayloadAction<Category>) => {
			state.detail.loading = false;
			state.detail.data = action.payload;
		},
		detailCategoryError: (state, action: PayloadAction<PayloadError>) => {
			state.detail.loading = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		addCategoryRequest: (state, action: PayloadAction<CategoryAddPayload>) => {
			state.add.pending = true;
		},
		addCategorySuccess: state => {
			state.add.pending = false;
			pushNotification({ type: 'success', message: 'Add category success' });
		},
		addCategoryError: (state, action: PayloadAction<PayloadError>) => {
			state.add.pending = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		editCategoryRequest: (state, action: PayloadAction<CategoryEditPayload>) => {
			state.edit.pending = true;
		},
		editCategorySuccess: state => {
			state.edit.pending = false;
			pushNotification({ type: 'success', message: 'Edit category success' });
		},
		editCategoryError: (state, action: PayloadAction<PayloadError>) => {
			state.edit.pending = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		deleteCategoryRequest: (state, action: PayloadAction<CategoryDeletePayload>) => {
			state.delete.pending = true;
		},
		deleteCategorySuccess: state => {
			state.delete.pending = false;
			pushNotification({ type: 'success', message: 'Delete category success' });
		},
		deleteCategoryError: (state, action: PayloadAction<PayloadError>) => {
			state.delete.pending = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		}
	}
})

export const {
	categoryRequest,
	categorySuccess,
	categoryError,

	detailCategoryRequest,
	detailCategorySuccess,
	detailCategoryError,

	addCategoryRequest,
	addCategorySuccess,
	addCategoryError,

	editCategoryRequest,
	editCategorySuccess,
	editCategoryError,

	deleteCategoryRequest,
	deleteCategorySuccess,
	deleteCategoryError,
} = categorySlice.actions;

export default categorySlice;