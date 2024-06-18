import { createSlice } from '@reduxjs/toolkit'
import { updateLocationThunk } from './thunk';
import { location } from 'types/ViTri';
type TypeLocation = {
    location ? : location
}
const initialState : TypeLocation = {
}

const updateLocationSlice = createSlice({
  name: 'deleteLocationSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(updateLocationThunk.fulfilled,(state,{payload}) => {
        state.location = payload
      })
  },
});

export const {} = updateLocationSlice.actions

export default updateLocationSlice.reducer