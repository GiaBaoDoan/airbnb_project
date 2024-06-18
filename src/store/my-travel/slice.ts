import { getMyTrips } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
import { myTrip } from "types/QuanLyPhong";
type SliceType = {
  myTrips: myTrip[];
};
const initialState: SliceType = {
  myTrips: [],
};
const getMyTripsSlice = createSlice({
  name: "getMyTripsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyTrips.fulfilled, (state, { payload }) => {
      state.myTrips = payload;
    });
  },
});
export const { reducer: getMyTripsReducer } = getMyTripsSlice;
