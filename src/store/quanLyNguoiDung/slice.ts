import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./thunk";

const initialState = {};

const quanlyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, () => {
    });    
  },
});

export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungActions } = quanlyNguoiDungSlice;

