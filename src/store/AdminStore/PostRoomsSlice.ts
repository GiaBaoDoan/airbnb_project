import { createSlice } from '@reduxjs/toolkit'
import { PostRoomThunk } from './thunk';
import { ListRooms } from 'types/QuanLyPhong';
type room = {
    NewRooms ?: ListRooms
}
const initialState  :room = {
}

const PostRoomSlice = createSlice({
  name: 'renderListUers',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(PostRoomThunk.fulfilled,(state,{payload}) => {
        state.NewRooms = payload
    })
  },
});

export const {} = PostRoomSlice.actions

export default PostRoomSlice.reducer