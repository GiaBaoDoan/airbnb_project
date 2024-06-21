import { createSlice } from "@reduxjs/toolkit";
type typeAction = {
  open: boolean;
};
const initialState: typeAction = {
  open: false,
};
const searchSlice = createSlice({
  name: "searchSlice",
  reducers: {
    setAction(state, { payload }) {
      state.open = payload;
    },
  },
  initialState,
});
export const { setAction } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
