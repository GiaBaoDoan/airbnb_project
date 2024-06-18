import { createSlice } from "@reduxjs/toolkit";
import { huyChuyenThunk } from "./thunk";
import { toast } from "react-toastify";
const initialState = {};
const HuyChuyenSlice = createSlice({
  name: "huyChuyenSlice",
  initialState,
  extraReducers(builder) {
    builder.addCase(huyChuyenThunk.fulfilled, () => {
      toast.error("Hủy chuyến thành công");
    });
    builder.addCase(huyChuyenThunk.rejected, (_, { payload }) => {
      console.log(payload);
    });
  },
  reducers: {},
});

export const { reducer: huyChuyenReducer } = HuyChuyenSlice;
