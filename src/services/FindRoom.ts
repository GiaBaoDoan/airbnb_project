import { apiInstance } from "constant";
import { ListRooms } from "types/QuanLyPhong";
const api = apiInstance({
  baseURL: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/lay-phong-theo-vi-tri`,
});
export const findRoomService = {
  findRoom: (id: number) => api.get<ApiRespose<ListRooms[]>>(`/?maViTri=${id}`),
};
