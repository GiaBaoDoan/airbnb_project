import { apiInstance } from "constant";
import { airbnbRoom } from "types/QuanLyAirbnb";
import { bookRoom, myTrip } from "types/QuanLyPhong";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_PHONG,
});

export const quanLyAirbnbServices = {
  getRoomList: () => api.get<ApiRespose<airbnbRoom[]>>("/phong-thue"),
  postRoom: (room: bookRoom) =>
    api.post<ApiRespose<bookRoom>>("/dat-phong", room),
  getDetailRoom: (id: number) =>
    api.get<ApiRespose<airbnbRoom>>(`/phong-thue/${id}`),
  getRoomCommentList: () => api.get<ApiRespose<airbnbRoom[]>>("/binh-luan"),
  huyChuyen: (id: any) => api.delete<ApiRespose<any>>(`/dat-phong/${id}`),
  getMyTrip: (IUser: any) =>
    api.get<ApiRespose<myTrip[]>>(`/dat-phong/lay-theo-nguoi-dung/${IUser}`),
};
