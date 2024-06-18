// config url cho api
import { apiInstance } from "constant";
import { User } from "types";
const api = apiInstance({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/auth",
});
export const quanlyNguoiDungServices = {
  register: (payload) => api.post("/signup", payload),
  login: (payload: any) => api.post<ApiRespose<User>>("/signin", payload),
};
