import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbServices } from "services/quanlyAirbnb";
export const getAirbnbListThunk = createAsyncThunk(
  "getRoomList/getRoomListThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await quanLyAirbnbServices.getRoomList();
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
