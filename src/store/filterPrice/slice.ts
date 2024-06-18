import { createSlice } from "@reduxjs/toolkit";
type feature = { text: string; val: string };
type TypeFilter = {
  minPrice: number | null;
  maxPrice: number | null;
  feature?: feature[];
};
const initialState: TypeFilter = {
  minPrice: null,
  maxPrice: null,
  feature: [],
};
const findRoomSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    min: (state, { payload }) => {
      state.minPrice = payload;
    },
    max: (state, { payload }) => {
      state.maxPrice = payload;
    },
    addFeature: (state, { payload }) => {
      state.feature = payload;
    },
  },
});

export const { min, max, addFeature } = findRoomSlice.actions;

export default findRoomSlice.reducer;
