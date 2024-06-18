import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbCommentServices } from "services/quanlyAirbnbComment";

export const postCommentThunk = createAsyncThunk(
  "getAirBnBcomment/postCommentThunk",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbCommentServices.postComment(payload);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
