import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserAdd, UserDelete, UserEdit, UserResponse, UserState } from "./type";
import { pushNotification, wait } from "@helper";
import { appApi } from "@src/api";
import { AxiosError } from "axios";
import { UnknownAsyncThunkRejectedAction } from "@reduxjs/toolkit/dist/matchers";

const initialState: UserState = {
    userList: {
        data: [],
        loading: false,
    },
    add: {
        error: {},
        pending: false,
    },
    detail: {
        data: {},
        loading: false,
    },
    edit: {
        error: {},
        pending: false,
    },
    delete: {
        error: {},
        pending: false,
    }
}

export const fetchUser = createAsyncThunk(
    'user/fetchUserList',
    async (limit: number, ThunkApi) => {
        await wait();
        try {
            const response = await appApi.get('users', { params: { limit: limit } });
            const userResponse = response.data as UserResponse;
            return ThunkApi.fulfillWithValue(userResponse.users);
        }
        catch (e) {
            const error = e as AxiosError;
            return ThunkApi.rejectWithValue({ error: error.response?.data.message });
        }
    }
)

export const addUser = createAsyncThunk(
    'user/addUser',
    async ({ data, callback }: UserAdd, ThunkApi) => {
        await wait();
        try {
            await appApi.post('users/add', data);
            callback();
            return ThunkApi.fulfillWithValue('success');
        }
        catch (e) {
            const error = e as AxiosError;
            return ThunkApi.rejectWithValue({ error: error });
        }
    }
)

export const getUserDetail = createAsyncThunk(
    'user/getUser',
    async (id: number, ThunkApi) => {
        await wait();
        try {
            const response = await appApi.get('users/' + id);
            return ThunkApi.fulfillWithValue(response.data);
        }
        catch (e) {
            const error = e as AxiosError;
            return ThunkApi.rejectWithValue({ error: error });
        }
    }
)

export const editUser = createAsyncThunk(
    'user/editUser',
    async ({ id, data, callback }: UserEdit, ThunkApi) => {
        await wait();
        try {
            await appApi.patch('users/' + id, data);
            callback();
            return ThunkApi.fulfillWithValue('Success');
        }
        catch (e) {
            const error = e as AxiosError;
            return ThunkApi.rejectWithValue({ error: error });
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async ({ id, callback }: UserDelete, ThunkApi) => {
        await wait();
        try {
            await appApi.delete('users/' + id);
            callback();
            return ThunkApi.fulfillWithValue('Success');
        }
        catch (e) {
            const error = e as AxiosError;
            return ThunkApi.rejectWithValue({ error: error });
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // FETCH USER
        builder.addCase(fetchUser.pending, state => {
            state.userList.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.userList.loading = false;
            state.userList.data = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action: UnknownAsyncThunkRejectedAction) => {
            state.userList.loading = false;
        });
        // ADD USER
        builder.addCase(addUser.pending, state => {
            state.add.pending = true;
        });
        builder.addCase(addUser.fulfilled, state => {
            state.add.pending = false;
            pushNotification({ type: 'success', message: 'Add User success' });
        });
        builder.addCase(addUser.rejected, state => {
            state.add.pending = false;
            pushNotification({ type: 'error', message: 'Add User error' });
        });
        // GET USER
        builder.addCase(getUserDetail.pending, state => {
            state.detail.loading = true;
        });
        builder.addCase(getUserDetail.fulfilled, (state, action: PayloadAction<User>) => {
            state.detail.loading = false;
            state.detail.data = action.payload;
        });
        builder.addCase(getUserDetail.rejected, state => {
            state.detail.loading = false;
            pushNotification({ type: 'error', message: 'Some thing wrong' });
        })
        // EDIT USER
        builder.addCase(editUser.pending, state => {
            state.edit.pending = true;
        });
        builder.addCase(editUser.fulfilled, state => {
            state.edit.pending = false;
            pushNotification({type: 'success', message: 'Edit User success'})
        });
        builder.addCase(editUser.rejected, state => {
            state.edit.pending = false;
            pushNotification({ type: 'error', message: 'Some thing wrong' });
        })
        // DELETE USER
        builder.addCase(deleteUser.pending, state => {
            state.delete.pending = true;
        });
        builder.addCase(deleteUser.fulfilled, state => {
            state.delete.pending = false;
            pushNotification({type: 'success', message: 'Delete User success'})
        });
        builder.addCase(deleteUser.rejected, state => {
            state.delete.pending = false;
            pushNotification({ type: 'error', message: 'Some thing wrong' });
        })
    }
})

export default userSlice;