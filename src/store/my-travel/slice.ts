import { getMyTrips } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
import { myTrip } from "types/QuanLyPhong";
type SliceType = {
  myTrips: myTrip[];
  isLoading: boolean;
};
const initialState: SliceType = {
  myTrips: [],
  isLoading: false,
};
const getMyTripsSlice = createSlice({
  name: "getMyTripsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyTrips.fulfilled, (state, { payload }) => {
      state.myTrips = payload;
      state.isLoading = false;
    });
    builder.addCase(getMyTrips.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getMyTrips.pending, (state) => {
      state.isLoading = true;
    });
  },
});
export const { reducer: getMyTripsReducer } = getMyTripsSlice;
