import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationService } from "services/GetViTri";
export const getLocationThunk = createAsyncThunk(
    "getLocationThunk", 
    async (_, { rejectWithValue }) => { 
      try {
        const result = await getLocationService.getLocation(); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
)