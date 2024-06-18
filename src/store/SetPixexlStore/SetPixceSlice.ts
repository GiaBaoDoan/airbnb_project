import { createSlice } from '@reduxjs/toolkit'
type Value = {
    value ?: boolean
}
const initialState : Value = {

}

const SetPixceSlice = createSlice({
  name: 'setPixelSlice',
  initialState,
  reducers: {
    setPixel (state ,{payload}) {
       state.value =payload
    }
  }
});

export const {setPixel} = SetPixceSlice.actions

export default SetPixceSlice.reducer