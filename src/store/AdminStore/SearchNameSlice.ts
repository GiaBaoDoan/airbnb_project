import { createSlice } from '@reduxjs/toolkit'
import { searchThunk } from './thunk';
import { ThongTinUser } from 'types';
type ListSort = {
    ListSort ?: ThongTinUser[]
}
const initialState : ListSort = {
}


const SearchNameSlice = createSlice({
  name: 'searchName',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchThunk.fulfilled,(state,{payload}) => {
     state.ListSort = payload
  })
},
});

export const {} = SearchNameSlice.actions

export default SearchNameSlice.reducer