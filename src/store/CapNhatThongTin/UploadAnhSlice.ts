import { createSlice } from "@reduxjs/toolkit";
import { uploadAnhThunk } from "./thunk";
import { toast } from "react-toastify";
type AvatarType = {
  avatar?: string;
};
const initialState: AvatarType = {};
const UploadAnhSlice = createSlice({
  name: "UploadAnh",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(uploadAnhThunk.fulfilled, (state, { payload }) => {
      state.avatar = payload.avatar;
      toast.success("Cập nhật thành công");
    });
  },
});

export const {} = UploadAnhSlice.actions;

export default UploadAnhSlice.reducer;
