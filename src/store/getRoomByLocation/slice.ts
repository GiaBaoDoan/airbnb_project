import { createSlice } from "@reduxjs/toolkit";
import { getRoomByLocationThunk } from "./thunk";
type RoomByLocation = {
  roomByLocation?: any;
  isPending: boolean;
};
const initialState: RoomByLocation = {
  roomByLocation: [],
  isPending: false,
};
const roomByLocationSlice = createSlice({
  name: "getLocation",
  initialState,
  extraReducers(builder) {
    builder.addCase(getRoomByLocationThunk.fulfilled, (state, { payload }) => {
      state.roomByLocation = payload;
      state.isPending = false;
    });
    builder.addCase(getRoomByLocationThunk.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getRoomByLocationThunk.rejected, (state) => {
      state.isPending = false;
      state.roomByLocation = [];
    });
  },
  reducers: {},
});
export const {} = roomByLocationSlice.actions;
export default roomByLocationSlice.reducer;
