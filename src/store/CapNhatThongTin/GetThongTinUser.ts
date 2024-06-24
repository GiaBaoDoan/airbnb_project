import { createSlice } from "@reduxjs/toolkit";
import { getThongTinUserThunk } from "./thunk";
import { ThongTinUser } from "types";
type User = {
  ThongTinUser?: ThongTinUser;
  loadingUser?: boolean;
};
const initialState: User = {
  loadingUser: false,
};
const LayThongTinTinSlice = createSlice({
  name: "GetThongTinUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getThongTinUserThunk.fulfilled, (state, { payload }) => {
      state.ThongTinUser = payload;
      state.loadingUser = false;
    });
    builder.addCase(getThongTinUserThunk.pending, (state) => {
      state.loadingUser = true;
    });
    builder.addCase(getThongTinUserThunk.rejected, (state) => {
      state.loadingUser = false;
    });
  },
});

export const {} = LayThongTinTinSlice.actions;

export default LayThongTinTinSlice.reducer;
