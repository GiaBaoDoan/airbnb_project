import { createSlice } from "@reduxjs/toolkit";
import { deleteCommentThunk } from "./thunk";
import { toast } from "react-toastify";
type TypeDelete = {
  isDeleteting: boolean;
};
const initialState: TypeDelete = {
  isDeleteting: false,
};
const quanLyAirBnbSlice = createSlice({
  name: "quanLyAirbnb",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCommentThunk.pending, (state) => {
        state.isDeleteting = true;
      })
      .addCase(deleteCommentThunk.fulfilled, (state) => {
        toast.success("Xóa thành công");
        state.isDeleteting = false;
      })
      .addCase(
        deleteCommentThunk.rejected,
        (state, { payload }: { payload: any }) => {
          toast.error(payload?.response.data.content);
          state.isDeleteting = false;
        }
      );
  },
});
export const { reducer: deleteCommentReducer } = quanLyAirBnbSlice;
