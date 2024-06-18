import { createAsyncThunk } from "@reduxjs/toolkit";
import { findRoomService } from "services/FindRoom";
export const getRoomByLocationThunk = createAsyncThunk(
  "getRoomByLocationThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await findRoomService.findRoom(id);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
