import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbServices } from "services/quanlyAirbnb";
export const huyChuyenThunk = createAsyncThunk(
  "huyChuyeThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await quanLyAirbnbServices.huyChuyen(id);
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
