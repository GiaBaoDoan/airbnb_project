import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbServices } from "services/quanlyAirbnb";
import { bookRoom } from "types/QuanLyPhong";
export const bookRoomThunk = createAsyncThunk(
  "bookRoom/bookRoomThunk",
  async (payload: bookRoom, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbServices.postRoom(payload);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
