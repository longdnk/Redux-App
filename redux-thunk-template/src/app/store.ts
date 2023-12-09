import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '@src/features/Login/redux/loginSlice';
import userSlice from '@src/features/User/redux/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
