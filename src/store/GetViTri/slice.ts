import { createSlice } from "@reduxjs/toolkit";
import { getLocationThunk } from "./thunk";
import { location } from "types/ViTri";
type ListLocation = {
  location?: location[];
};
const initialState: ListLocation = {};

const getLocationSlice = createSlice({
  name: "getLocation",
  initialState,
  extraReducers(builder) {
    builder.addCase(getLocationThunk.fulfilled, (state, { payload }) => {
      state.location = payload;
    });
  },
  reducers: {},
});

export const {} = getLocationSlice.actions;

export default getLocationSlice.reducer;
