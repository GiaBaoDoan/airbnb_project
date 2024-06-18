// config url cho api
import { apiInstance } from "constant";
import {ThongTinUser} from "types";
import { ListRooms } from "types/QuanLyPhong";

const api = apiInstance({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/users",
});
const apiRooms = apiInstance({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/phong-thue/",
});

export const renderListUserService = {
   renderListUsers :   () => api.get<ApiRespose<ThongTinUser[]>>(''),
   deleteUser : (id ) => api.delete<ApiRespose<any>>(`?id=${id}`),
   searchTen : (name) => api.get<ApiRespose<ThongTinUser[]>>(`/search/${name}`),
   addUser : (data :any ) => api.post<ApiRespose<ThongTinUser>>('',data),
  };

  export const listRooms = {
    renderListRooms : () => apiRooms.get<ApiRespose<ListRooms[]>>(''),
    deleteRoom : (id : any ) => apiRooms.delete<ApiRespose<any>>(id),
    postRoom : (data: any) => apiRooms.post<ApiRespose<any>>('',data),
    editRoom : (id : any,payload:any) => apiRooms.put<ApiRespose<any>>(`${id}`,payload),
    
   };
   
 
