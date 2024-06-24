import { createSlice } from "@reduxjs/toolkit";
import { UpdateComentThunk } from "./thunk";
import { toast } from "react-toastify";

const initialState = {
  commentUpdate: null,
};
const updateCommentSlice = createSlice({
  name: "UpdateComentSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(UpdateComentThunk.fulfilled, (state, { payload }) => {
      state.commentUpdate = payload;
      toast.success("Cập nhật thành công");
    });
    builder.addCase(
      UpdateComentThunk.rejected,
      (_, { payload }: { payload: any }) => {
        toast.error(payload?.response?.data?.content);
      }
    );
  },
});
export const updateReducer = updateCommentSlice.reducer;
