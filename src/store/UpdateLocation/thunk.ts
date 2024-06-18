import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationService } from "services/GetViTri";
export const updateLocationThunk = createAsyncThunk(
    "updateLocationThunk", 
    async (param : {id ,data}, { rejectWithValue }) => { 
      try {
        const result = await getLocationService.updateLocation(param?.id,param?.data); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
)