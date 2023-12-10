import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './rootSaga';
import { reducer as authReducer } from "@features/Login/redux/reducer";
import { reducer as userReducer } from "@features/User/redux/reducer";

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware);
    },
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
