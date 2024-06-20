import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbServices } from "services/quanlyAirbnb";
export const getMyTrips = createAsyncThunk(
  "getMyTripsThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbServices.getMyTrip(id);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
