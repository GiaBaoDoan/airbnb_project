import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanlyNguoiDungServices } from "services";

export const registerThunk = createAsyncThunk(
  "quanLyNguoiDung/register",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await quanlyNguoiDungServices.register(payload);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const loginThunk = createAsyncThunk(
  "QuanLyNguoiDung/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await quanlyNguoiDungServices.login(payload);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
