import { apiInstance } from "constant";
import { myCustomDataType } from "types/QuanlyComment";
const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_COMMENT,
});
export const quanLyAirbnbCommentServices = {
  getRoomCommentList: () =>
    api.get<ApiRespose<myCustomDataType[]>>("/binh-luan"),
  postComment: (payload: any) =>
    api.post<ApiRespose<myCustomDataType>>("/binh-luan", payload),
  getRoomComment: (maPhong: string) =>
    api.get<ApiRespose<myCustomDataType[]>>(
      `/binh-luan/lay-binh-luan-theo-phong/${maPhong}`
    ),
  deleteComment: (id: number) =>
    api.delete<ApiRespose<myCustomDataType>>(`/binh-luan/${id}`),
};
