import { z } from "zod";
export const AccountSchema = z.object({
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .email("email không tồn tại "),
  phone: z.string().nonempty("Vui lòng nhập số điện thoại"),
  name: z.string().nonempty("Vui lòng nhập số họ tên"),
  birthday: z.string().refine((value) => value !== null, "Hahaa"),
  gender: z.string().nonempty("Vui lòng chọn giới tính"),
});
