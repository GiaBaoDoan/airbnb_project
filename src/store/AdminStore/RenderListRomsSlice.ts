import { createSlice } from '@reduxjs/toolkit'
import { renderListRoomsThunk, } from './thunk';
import { ListRooms } from 'types/QuanLyPhong';
type TypeListRooms = {
    ListRooms ?: ListRooms[]
}
const initialState : TypeListRooms = {
}

const RenderListRoomsSlice = createSlice({
  name: 'renderListUers',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(renderListRoomsThunk.fulfilled,(state,{payload}) => {
       state.ListRooms = payload
    })
  },
});

export const {} = RenderListRoomsSlice.actions

export default RenderListRoomsSlice.reducer