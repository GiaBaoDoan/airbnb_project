import { createSlice } from '@reduxjs/toolkit'
import { renderThunk } from './thunk';
import { ThongTinUser } from 'types';
type ListUsers = {
  ListUser ?: ThongTinUser[]
}
const initialState : ListUsers = {
}

const RenderListUsersSlice = createSlice({
  name: 'renderListUers',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(renderThunk.fulfilled,(state,{payload}) => {
       state.ListUser = payload
    })
  },
});

export const {} = RenderListUsersSlice.actions

export default RenderListUsersSlice.reducer