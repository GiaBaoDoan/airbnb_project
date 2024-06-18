import { createSlice } from "@reduxjs/toolkit";
import { getThongTinUserThunk } from "./thunk";
import { ThongTinUser} from "types";
type user = {
  ThongTinUser ?: ThongTinUser ,
} 
const initialState:user = {
};

const LayThongTinTinSlice = createSlice({
  name: "GetThongTinUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getThongTinUserThunk.fulfilled,(state,{payload}) => {
      state.ThongTinUser = payload
    })
   
  }
});

export const {} = LayThongTinTinSlice.actions;

export default LayThongTinTinSlice.reducer;