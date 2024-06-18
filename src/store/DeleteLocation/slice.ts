import { createSlice } from '@reduxjs/toolkit'
import { deleteLocationThunk } from './thunk';

const initialState = {

}

const deleteLocationSlice = createSlice({
  name: 'deleteLocationSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(deleteLocationThunk.fulfilled,() => {
      })
  },
});

export const {} = deleteLocationSlice.actions

export default deleteLocationSlice.reducer