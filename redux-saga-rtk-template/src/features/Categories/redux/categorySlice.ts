import { Category, CategoryState } from "./type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PayloadError, pushNotification } from "@helper";

const initialState: CategoryState = {
	list: {
		data: [],
		loading: false,
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
	}
})

export const {
	categoryRequest,
	categorySuccess,
	categoryError,
} = categorySlice.actions;

export default categorySlice;