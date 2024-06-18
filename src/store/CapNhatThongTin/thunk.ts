import { createAsyncThunk } from "@reduxjs/toolkit";
import { CapNhatThongTinServices } from "services";

export const capNhatThongTinThunk = createAsyncThunk(
  "CapNhatNguoiDung/ThayDoiThongTin",
  async (param: { id: string; payload: any }, { rejectWithValue }) => {
    try {
      const res = await CapNhatThongTinServices.capNhat(
        param.id,
        param.payload
      );
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getThongTinUserThunk = createAsyncThunk(
  "CapNhatNguoiDung/LayThongTin",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await CapNhatThongTinServices.getThongTinUser(id);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const uploadAnhThunk = createAsyncThunk(
  "CapNhatNguoiDung/UploadAnh",
  async (file: any, { rejectWithValue }) => {
    try {
      const res = await CapNhatThongTinServices.upLoadAnh(file);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
