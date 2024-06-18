import { createSlice } from '@reduxjs/toolkit'
import { deleteRoomThunk } from './thunk';

const initialState  = {
}

const deleteRoomSlice = createSlice({
  name: 'deleteRoom',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(deleteRoomThunk.fulfilled,() => {
    })
  },
});

export const {} = deleteRoomSlice.actions

export default deleteRoomSlice.reducer