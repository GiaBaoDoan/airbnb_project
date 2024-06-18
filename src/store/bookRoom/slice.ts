import { createSlice } from "@reduxjs/toolkit";
import { bookRoomThunk } from "./thunk";
import { toast } from "react-toastify";
const initialState = {
  content: {},
  bookingRoomLoading: false,
};
const bookingRoomSlice = createSlice({
  name: "quanLyAirbnb",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(bookRoomThunk.fulfilled, (state, payload) => {
      state.content = payload;
      toast.success("Đặt phòng thành công!!");
      state.bookingRoomLoading = false;
    });
    builder.addCase(bookRoomThunk.pending, (state, payload) => {
      state.content = payload;
      state.bookingRoomLoading = true;
    });
    builder.addCase(bookRoomThunk.rejected, (state) => {
      state.bookingRoomLoading = false;
      toast.error("Đặt phòng thất bại");
    });
  },
});
export const { reducer: bookingRoomReducer } = bookingRoomSlice;
