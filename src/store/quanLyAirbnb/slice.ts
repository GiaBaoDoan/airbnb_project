import { createSlice } from "@reduxjs/toolkit";
import { airbnbRoom } from "types/QuanLyAirbnb";
import { getAirbnbListThunk } from "./thunk";

type QuanlyAirbnbRoom = {
  AirbnbList: airbnbRoom[];
  isFetchingAirbnb: boolean;
};
const initialState: QuanlyAirbnbRoom = {
  AirbnbList: [],
  isFetchingAirbnb: false,
};
const quanLyAirBnbSlice = createSlice({
  name: "quanLyAirbnb",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAirbnbListThunk.pending, (state) => {
        state.isFetchingAirbnb = true;
      })
      .addCase(getAirbnbListThunk.fulfilled, (state, { payload }) => {
        state.AirbnbList = payload;
        state.isFetchingAirbnb = false;
      })
      .addCase(getAirbnbListThunk.rejected, (state) => {
        state.isFetchingAirbnb = false;
      });
  },
});
export const { reducer: quanLyAirbnbReducer, actions: quanLyAirbnbActions } =
  quanLyAirBnbSlice;
