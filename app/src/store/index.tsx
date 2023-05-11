import { configureStore } from "@reduxjs/toolkit";
import { Provider, ProviderProps } from "react-redux";
import lookupReducer from "./lookup";

const store = configureStore({
	reducer: {
		lookup: lookupReducer,
	},
});

export default function StoreProvider({
	children,
	...props
}: Omit<ProviderProps, "store">) {
	return (
		<Provider store={store} {...props}>
			{children}
		</Provider>
	);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
