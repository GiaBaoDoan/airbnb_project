import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbCommentServices } from "services/quanlyAirbnbComment";
export const deleteCommentThunk = createAsyncThunk(
  "/deleteComment",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbCommentServices.deleteComment(id);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
