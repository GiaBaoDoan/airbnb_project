import { toast } from "react-toastify";
import { postCommentThunk } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
type quanlyAirbnbComment = {
  isCommenting: boolean;
};
const initialState: quanlyAirbnbComment = {
  isCommenting: false,
};
const postCommentSlice = createSlice({
  name: "quanLyAirbnbComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCommentThunk.pending, (state) => {
        state.isCommenting = true;
      })
      .addCase(postCommentThunk.fulfilled, (state) => {
        state.isCommenting = false;
        toast.success("Đã thêm bình luận");
      })
      .addCase(postCommentThunk.rejected, (state) => {
        state.isCommenting = false;
        toast.error("Thêm thất bại");
      });
  },
});
export const { reducer: postCommentReducer, actions: postCommentActions } =
  postCommentSlice;
