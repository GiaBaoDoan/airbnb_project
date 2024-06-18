import { apiInstance } from "constant";
import { location } from "types/ViTri";
const api = apiInstance({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/vi-tri",
});
export const getLocationService = {
  getLocation: () => api.get<ApiRespose<location[]>>(""),
  deleteLocation: (id: number) => api.delete<ApiRespose<any>>(`${id}`),
  postLocation: (data: any) => api.post<ApiRespose<location>>("", data),
  updateLocation: (id: number, data: any) =>
    api.put<ApiRespose<location>>(`${id}`, data),
};
