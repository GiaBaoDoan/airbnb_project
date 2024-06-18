
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { LoginSchameType } from "schema/LoginSchame";
import { quanlyNguoiDungServices } from "services";


export const registerThunk = createAsyncThunk(
  "quanLyNguoiDung/register", 
  async (payload :any , { rejectWithValue }) => { 
    try {

      const data = await quanlyNguoiDungServices.register(payload); 
      return data.data.content 
   
      
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const loginThunk = createAsyncThunk(
  "QuanLyNguoiDung/login", 
  async (payload :any , { rejectWithValue }) => { 
    try {

      const data = await quanlyNguoiDungServices.login(payload); 
      return data.data.content 
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
