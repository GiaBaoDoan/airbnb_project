import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbServices } from "services/quanlyAirbnb";
const detailRoomThunk = createAsyncThunk(
  "getRoom/getDetailRom",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbServices.getDetailRoom(id);
      return res.data.content;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export default detailRoomThunk;
