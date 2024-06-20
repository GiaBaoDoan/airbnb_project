import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationService } from "services/GetViTri";
export const deleteLocationThunk = createAsyncThunk(
  "deleteLocationThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      const result = await getLocationService.deleteLocation(id);
      return result.data.content;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
