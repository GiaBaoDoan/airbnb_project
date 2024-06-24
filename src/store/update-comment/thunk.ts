import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyAirbnbCommentServices } from "services/quanlyAirbnbComment";
export const UpdateComentThunk = createAsyncThunk(
  "UpdateCommentThunk",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await quanLyAirbnbCommentServices.updateComment(
        payload.id,
        payload
      );
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
