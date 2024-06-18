import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationService } from "services/GetViTri";
export const postLocationThunk = createAsyncThunk(
    "postLocationThunk", 
    async (data:any, { rejectWithValue }) => { 
      try {
        const result = await getLocationService.postLocation(data); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
)