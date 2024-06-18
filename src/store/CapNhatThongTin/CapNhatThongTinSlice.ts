import { createSlice } from "@reduxjs/toolkit";
import { capNhatThongTinThunk } from "./thunk";
import { ThongTinUser } from "types";
type user = {
  user ?: ThongTinUser ;
  isLoading ?: boolean 

} 
const initialState:user = {
  isLoading : false
};

const CapNhatThongTinSlice = createSlice({
  name: "CapNhatThongTin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(capNhatThongTinThunk.fulfilled,(state,{payload}) => {
      state.user = payload
      state.isLoading = false
    })
    builder.addCase(capNhatThongTinThunk.pending,(state) => {
      state.isLoading = true
    })
    builder.addCase(capNhatThongTinThunk.rejected,(state) => {
      state.isLoading = false
    })
  }
});

export const {} = CapNhatThongTinSlice.actions;

export default CapNhatThongTinSlice.reducer;
