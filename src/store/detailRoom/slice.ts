import { createSlice } from "@reduxjs/toolkit";
import detailRoomThunk from "./thunk";
import { ListRooms } from "types/QuanLyPhong";
type TypeDeailRoom = {
  detailRoom: ListRooms;
  detailRoomLoading: boolean;
};
const initialState: TypeDeailRoom = {
  detailRoom: null,
  detailRoomLoading: false,
};
const detailRoom = createSlice({
  name: "getLocation",
  initialState,
  extraReducers(builder) {
    builder.addCase(detailRoomThunk.fulfilled, (state, { payload }) => {
      state.detailRoom = payload;
      state.detailRoomLoading = false;
    });
    builder.addCase(detailRoomThunk.pending, (state) => {
      state.detailRoomLoading = true;
    });
    builder.addCase(detailRoomThunk.rejected, (state) => {
      state.detailRoomLoading = false;
    });
  },
  reducers: {},
});
export const {} = detailRoom.actions;
export default detailRoom.reducer;
