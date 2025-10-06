import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
