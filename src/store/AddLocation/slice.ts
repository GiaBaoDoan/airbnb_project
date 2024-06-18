import { createSlice } from '@reduxjs/toolkit'
import { postLocationThunk } from './thunk';
import { location } from 'types/ViTri';
type TypeLocation = {
    location ? : location
}
const initialState : TypeLocation = {

}

const postLocationSlice = createSlice({
  name: 'deleteLocationSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(postLocationThunk.fulfilled,(state,{payload}) => {
        state.location = payload
      })
  },
});

export const {} = postLocationSlice.actions

export default postLocationSlice.reducer