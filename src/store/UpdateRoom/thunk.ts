import { createAsyncThunk } from "@reduxjs/toolkit";
import { listRooms } from "services/Admin";
export const updateRoomThunk = createAsyncThunk(
    "updateRoomThunk", 
    async (param : {id,payload} ,{ rejectWithValue }) => { 
      try {
        const result = await listRooms.editRoom(param?.id,param.payload)
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
)