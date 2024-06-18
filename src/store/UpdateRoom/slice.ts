import { createSlice } from '@reduxjs/toolkit'
import { ListRooms } from 'types/QuanLyPhong';
import { updateRoomThunk } from './thunk';
type listRooms = {
    listRooms ? : ListRooms
}
const initialState : listRooms = {
}

const updateRoomSlice = createSlice({
  name: 'getLocation',
  initialState,
  extraReducers(builder) {
    builder.addCase(updateRoomThunk.fulfilled,(state,{payload}) => {
        state.listRooms = payload
    })
  },
  reducers: {}
});

export const {} = updateRoomSlice.actions

export default updateRoomSlice.reducer