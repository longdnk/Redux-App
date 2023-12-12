import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from "redux-saga";
import rootSaga from "@app/rootSaga";
import loginSlice from "@features/Login/redux/loginSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: loginSlice.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware);
	}
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