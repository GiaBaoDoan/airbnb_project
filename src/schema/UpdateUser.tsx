import { z } from "zod";
export const upDateUser = z.object({
  id: z.number(),
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .email("email không tồn tại "),
  name: z.string().nonempty("Vui lòng nhập số họ tên"),
  phone: z.any(),
  password: z.any(),
  birthday: z.string().nonempty(),
  gender: z.string().nonempty("Vui lòng chọn giới tính"),
  role: z.string().nonempty("Vui lòng nhập loại người dùng"),
});
