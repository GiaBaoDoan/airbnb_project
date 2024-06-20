import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbCommentServices } from "services/quanlyAirbnbComment";
export const getAirbnbCommentThunk = createAsyncThunk(
  "getAirBnBcomment/CommentThunk",
  async (payload: string, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbCommentServices.getRoomComment(payload);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
