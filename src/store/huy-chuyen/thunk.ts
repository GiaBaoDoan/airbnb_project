import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbServices } from "services/quanlyAirbnb";
export const HuyChuyenThunk = createAsyncThunk(
  "huyChuyenThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbServices.huyChuyen(id);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
