import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";
import { getThongTinUserThunk } from "./CapNhatThongTin/thunk";
export const store = configureStore({
  reducer: rootReducer,
});
localStorage.getItem("id")
  ? store.dispatch(getThongTinUserThunk(localStorage.getItem("id")))
  : "";
export type RootState = ReturnType<(typeof store)["getState"]>;
type AppDispath = (typeof store)["dispatch"];
export const useAppDispath: () => AppDispath = useDispatch;
