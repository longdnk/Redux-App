import { Product, ProductAddPayload, ProductDelete, ProductDeletePayload, ProductEdit, ProductEditPayload, ProductState } from "./type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PayloadError, pushNotification } from "@helper";

const initialState: ProductState = {
	list: {
		data: [],
		loading: false,
	},
	add: {
		error: '',
		pending: false,
	},
	detail: {
		data: {},
		loading: false,
	},
	delete: {
		pending: false,
		error: '',
	},
	edit: {
		pending: false,
		error: '',
	}
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProductRequest: state => {
			state.list.loading = true;
		},
		getProductSuccess: (state, action: PayloadAction<Product[]>) => {
			state.list.loading = false;
			state.list.data = action.payload;
		},
		getProductError: (state, action: PayloadAction<PayloadError>) => {
			state.list.loading = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		addProductRequest: (state, action: PayloadAction<ProductAddPayload>) => {
			state.add.pending = true;
		},
		addProductSuccess: state => {
			state.add.pending = false;
			state.add.error = '';
			pushNotification({ type: 'success', message: 'Add product success' });
		},
		addProductError: (state, action: PayloadAction<PayloadError>) => {
			state.add.pending = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		detailProductRequest: (state, action: PayloadAction<string>) => {
			state.detail.loading = true;
		},
		detailProductSuccess: (state, action: PayloadAction<Product>) => {
			state.detail.loading = false;
			state.detail.data = action.payload;
		},
		detailProductError: (state, action: PayloadAction<PayloadError>) => {
			state.detail.loading = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		editProductRequest: (state, action: PayloadAction<ProductEditPayload>) => {
			state.edit.pending = true;
		},
		editProductSuccess: state => {
			state.edit.pending = false;
			pushNotification({ type: 'success', message: 'Edit product success' });
		},
		editProductError: (state, action: PayloadAction<PayloadError>) => {
			state.edit.pending = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		},

		deleteProductRequest: (state, action: PayloadAction<ProductDeletePayload>) => {
			state.delete.pending = true;
		},
		deleteProductSuccess: state => {
			state.delete.pending = false;
			pushNotification({ type: 'success', message: 'Delete product success' });
		},
		deleteProductError: (state, action: PayloadAction<PayloadError>) => {
			state.delete.pending = false;
			pushNotification({ type: 'error', message: action.payload.response.data.message ?? action.payload.message });
		}

	}
})

export const {
	getProductRequest,
	getProductSuccess,
	getProductError,

	addProductRequest,
	addProductSuccess,
	addProductError,

	detailProductRequest,
	detailProductSuccess,
	detailProductError,

	editProductRequest,
	editProductSuccess,
	editProductError,

	deleteProductRequest,
	deleteProductSuccess,
	deleteProductError,

} = productSlice.actions;

export default productSlice;