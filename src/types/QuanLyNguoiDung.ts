// config data đăng nhập của backend
export type User = {
  user?: ThongTinUser;
  token?: string;
};
export type ThongTinUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
};
