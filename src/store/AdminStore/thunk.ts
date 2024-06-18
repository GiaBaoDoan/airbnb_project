import { createAsyncThunk } from "@reduxjs/toolkit";
import { renderListUserService } from "services/Admin";
import {listRooms} from 'services/Admin'

export const renderThunk = createAsyncThunk(
    "Admin/renderListUers", 
    async (_, { rejectWithValue }) => { 
      try {
        const result = await renderListUserService.renderListUsers(); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  export const deleteThunk = createAsyncThunk(
    "Admin/deleteUser", 
    async (id :any, { rejectWithValue }) => { 
      try {
        const result = await renderListUserService.deleteUser(id); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );  
  export const searchThunk = createAsyncThunk(
    "Admin/searchName", 
    async (name :string, { rejectWithValue }) => { 
      try {
        const result = await renderListUserService.searchTen(name); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );   
  export const AddUserThunk = createAsyncThunk(
    "Admin/addUser", 
    async (payload :any , { rejectWithValue }) => { 
      try {
        const result = await renderListUserService.addUser(payload); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );   
  export const renderListRoomsThunk = createAsyncThunk(
    "Admin/renderListRooms", 
    async (_, { rejectWithValue }) => { 
      try {
        const result = await listRooms.renderListRooms(); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );   
  export const deleteRoomThunk = createAsyncThunk(
    "Admin/deleteRoomThunk", 
    async (id:any, { rejectWithValue }) => { 
      try {
        const result = await listRooms.deleteRoom(String(id)); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  ); 
  export const PostRoomThunk = createAsyncThunk(
    "Admin/PostRoomThunk", 
    async (data: any, { rejectWithValue }) => { 
      try {
        const result = await listRooms.postRoom(data); 
        return result.data.content       
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  ); 