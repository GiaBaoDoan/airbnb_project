import { createSlice } from "@reduxjs/toolkit";
import { findRoomThunk } from "./thunk";
import { ListRooms } from "types/QuanLyPhong";
type listRooms = {
  listRooms?: ListRooms[];
};
const initialState: listRooms = {};
const findRoomSlice = createSlice({
  name: "getLocation",
  initialState,
  extraReducers(builder) {
    builder.addCase(findRoomThunk.fulfilled, (state, { payload }) => {
      state.listRooms = payload;
    });
  },
  reducers: {},
});

export const {} = findRoomSlice.actions;

export default findRoomSlice.reducer;
