import { createSlice } from '@reduxjs/toolkit'
import { deleteThunk } from './thunk';

const initialState  = {
}

const DeleteSlice = createSlice({
  name: 'renderListUers',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(deleteThunk.fulfilled,() => {
    })
  },
});

export const {} = DeleteSlice.actions

export default DeleteSlice.reducer