import { createAsyncThunk } from "@reduxjs/toolkit";
import { findRoomService } from "services/FindRoom";
export const findRoomThunk = createAsyncThunk(
    "findRoomThunk", 
    async (id :number ,{ rejectWithValue }) => { 
      try {
        const result = await findRoomService.findRoom(id); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
)