import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, LoginError, LoginPayload, LoginSuccess } from "./type";
import { appApi } from "api";
import { AxiosError } from "axios";
import { pushNotification, setToken } from "@helper";
import { UnknownAsyncThunkRejectedAction } from "@reduxjs/toolkit/dist/matchers";
import { wait } from '@helper';

const initialState: AuthState = {
    auth: {
        pending: false,
    }
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ data, callback }: LoginPayload, ThunkApi) => {
        await wait();
        try {
            const response = await appApi.post('auth/login', data);
            callback();
            return ThunkApi.fulfillWithValue(response.data);
        }
        catch (e) {
            const error = e as AxiosError;
            return ThunkApi.rejectWithValue({ error: error.response?.data.message });
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loginUser.pending, state => {
            state.auth.pending = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginSuccess>) => {
            state.auth.pending = false;
            setToken(action.payload);
            pushNotification({ type: 'success', message: 'Login success' });
        });
        builder.addCase(loginUser.rejected, (state, action: UnknownAsyncThunkRejectedAction) => {
            state.auth.pending = false;
            const response = action.payload as LoginError;
            // kminchelle
            // 0lelplR
            pushNotification({ type: 'error', message: response.error ?? action.error.message });
        })
    }
})

export default authSlice;