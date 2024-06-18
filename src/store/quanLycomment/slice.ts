import { myCustomDataType } from "types/QuanlyComment";
import { getAirbnbCommentThunk } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";

type quanlyAirbnbComment = {
  Airbnbcomment: myCustomDataType[];
  isFetchingCommentAirbnb: boolean;
};
const initialState: quanlyAirbnbComment = {
  Airbnbcomment: [],
  isFetchingCommentAirbnb: false,
};
const quanLyAirBnbcommentSlice = createSlice({
  name: "quanLyAirbnbComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAirbnbCommentThunk.pending, (state) => {
        state.isFetchingCommentAirbnb = true;
      })
      .addCase(getAirbnbCommentThunk.fulfilled, (state, { payload }) => {
        state.Airbnbcomment = payload;
        state.isFetchingCommentAirbnb = false;
      })
      .addCase(getAirbnbCommentThunk.rejected, (state) => {
        state.isFetchingCommentAirbnb = false;
      });
  },
});
export const {
  reducer: quanLyAirbnbCommentReducer,
  actions: quanLyAirbnbCommentActions,
} = quanLyAirBnbcommentSlice;
