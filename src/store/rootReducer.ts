import { combineReducers } from "@reduxjs/toolkit";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung/slice";
import LoginReducer from "./quanLyNguoiDung/LoginSlice";
import LayThongTinTinSlice from "./CapNhatThongTin/GetThongTinUser";
import DetailRoomReducer from "./detailRoom/slice";
import CapNhatThongTinSlice from "./CapNhatThongTin/CapNhatThongTinSlice";
import UploadAnhSlice from "./CapNhatThongTin/UploadAnhSlice";
import RenderListUsersSlice from "./AdminStore/RenderListUsersSlice";
import DeleteSlice from "./AdminStore/DeleteSilce";
import SearchNameSlice from "./AdminStore/SearchNameSlice";
import AddUserSlice from "./AdminStore/AddUserSlice";
import roomByLocationSlice from "./getRoomByLocation/slice";
import SetPixceSlice from "./SetPixexlStore/SetPixceSlice";
import RenderListRoomsSlice from "./AdminStore/RenderListRomsSlice";
import { quanLyAirbnbReducer } from "./quanLyAirbnb/slice";
import { quanLyAirbnbCommentReducer } from "./quanLycomment/slice";
import DeleteRoomSlice from "./AdminStore/DeleteRoomSlice";
import PostRoomsSlice from "./AdminStore/PostRoomsSlice";
import getLocationSlice from "./GetViTri/slice";
import findRoomSlice from "./FindRoom/slice";
import updateRoomSlice from "./UpdateRoom/slice";
import deleteLocationSlice from "./DeleteLocation/slice";
import postLocationSlice from "./AddLocation/slice";
import updateLocationSlice from "./UpdateLocation/slice";
import { postCommentReducer } from "./postComment/slice";
import { bookingRoomReducer } from "./bookRoom/slice";
import fitlerReducer from "./filterPrice/slice";
import { deleteCommentReducer } from "./deleteComment/slice";
import { getMyTripsReducer } from "./my-travel/slice";
import { huyChuyenReducer } from "./huy-chuyen/slice";
import { searchReducer } from "./searchSlice/slice";

export const rootReducer = combineReducers({
  fitlerReducer: fitlerReducer,
  searchReducer: searchReducer,
  deleteCommentReducer: deleteCommentReducer,
  quanLyNguoiDung: quanLyNguoiDungReducer,
  roomByLocationReducer: roomByLocationSlice,
  detailRoom: DetailRoomReducer,
  getMyTripsReducer: getMyTripsReducer,
  LoginReducer: LoginReducer,
  huyChuyenReducer,
  bookingRoomReducer: bookingRoomReducer,
  LayThongTinTinReducer: LayThongTinTinSlice,
  CapNhatThongTinReducer: CapNhatThongTinSlice,
  UploadAnhReducer: UploadAnhSlice,
  RenderListUsersReducers: RenderListUsersSlice,
  deleteReducer: DeleteSlice,
  deleteRoomReducer: DeleteRoomSlice,
  SearchNameReducer: SearchNameSlice,
  AddUserReducer: AddUserSlice,
  SetPixceReducer: SetPixceSlice,
  RenderListRoomsReducer: RenderListRoomsSlice,
  quanLyAirbnb: quanLyAirbnbReducer,
  quanlyairbnbComment: quanLyAirbnbCommentReducer,
  postRoomReducer: PostRoomsSlice,
  getLocationReducer: getLocationSlice,
  findRoomReducer: findRoomSlice,
  postCommentReducer: postCommentReducer,
  updateRoomReducer: updateRoomSlice,
  deleteLocationReducer: deleteLocationSlice,
  postLocationReducer: postLocationSlice,
  updateLocationReducer: updateLocationSlice,
});
