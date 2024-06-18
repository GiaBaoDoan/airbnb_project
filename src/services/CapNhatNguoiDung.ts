// config url cho api
import { apiInstance } from "constant";
import { ThongTinUser } from "types";

const api = apiInstance({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/users/",
});
export const CapNhatThongTinServices = {
  getThongTinUser: (id: any) => api.get<ApiRespose<ThongTinUser>>(id),
  capNhat: (id: string, data: any) =>
    api.put<ApiRespose<ThongTinUser>>(id, data),
  upLoadAnh: (file: any) =>
    api.post<ApiRespose<ThongTinUser>>("/upload-avatar", file),
};
