import { combineReducers } from "@reduxjs/toolkit";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung/slice";
import LoginReducer from "./quanLyNguoiDung/LoginSlice";
import LayThongTinTinSlice from "./CapNhatThongTin/GetThongTinUser";
import DetailRoomReducer from "./detailRoom/slice";
import CapNhatThongTinSlice from "./CapNhatThongTin/CapNhatThongTinSlice";
import UploadAnhSlice from "./CapNhatThongTin/UploadAnhSlice";
import roomByLocationSlice from "./getRoomByLocation/slice";
import { quanLyAirbnbReducer } from "./quanLyAirbnb/slice";
import { quanLyAirbnbCommentReducer } from "./quanLycomment/slice";
import getLocationSlice from "./GetViTri/slice";
import findRoomSlice from "./FindRoom/slice";
import deleteLocationSlice from "./DeleteLocation/slice";
import { postCommentReducer } from "./postComment/slice";
import { bookingRoomReducer } from "./bookRoom/slice";
import fitlerReducer from "./filterPrice/slice";
import { deleteCommentReducer } from "./deleteComment/slice";
import { getMyTripsReducer } from "./my-travel/slice";
import { searchReducer } from "./searchSlice/slice";
import { updateReducer } from "./update-comment/slice";
export const rootReducer = combineReducers({
  fitlerReducer: fitlerReducer,
  updateReducer: updateReducer,
  searchReducer: searchReducer,
  deleteCommentReducer: deleteCommentReducer,
  quanLyNguoiDung: quanLyNguoiDungReducer,
  roomByLocationReducer: roomByLocationSlice,
  detailRoom: DetailRoomReducer,
  getMyTripsReducer: getMyTripsReducer,
  LoginReducer: LoginReducer,
  bookingRoomReducer: bookingRoomReducer,
  LayThongTinTinReducer: LayThongTinTinSlice,
  CapNhatThongTinReducer: CapNhatThongTinSlice,
  UploadAnhReducer: UploadAnhSlice,
  quanLyAirbnb: quanLyAirbnbReducer,
  quanlyairbnbComment: quanLyAirbnbCommentReducer,
  getLocationReducer: getLocationSlice,
  findRoomReducer: findRoomSlice,
  postCommentReducer: postCommentReducer,
  deleteLocationReducer: deleteLocationSlice,
});
