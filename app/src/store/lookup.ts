import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const lookupSlice = createSlice({
	name: "lookup",
	initialState: "",
	reducers: {
		setLookup: (state, action: PayloadAction<string>) => {
			state = action.payload;
			return state; // We are not using Immer, so we need to return the state.
		},
	},
});

export const { setLookup } = lookupSlice.actions;
export default lookupSlice.reducer;
