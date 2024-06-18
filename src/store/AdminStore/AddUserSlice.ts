import { createSlice } from '@reduxjs/toolkit'
import { AddUserThunk } from './thunk';
import { ThongTinUser } from 'types';
type newUser   = {
  newUser ? :ThongTinUser 
}
const initialState :newUser   = {
}

const AddUserSlice = createSlice({
  name: 'addUsers',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(AddUserThunk.fulfilled,(state,{payload}) => {
        state.newUser =  payload
    })
  },
});

export const {} = AddUserSlice.actions

export default AddUserSlice.reducer