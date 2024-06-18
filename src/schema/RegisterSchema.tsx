import { z } from "zod";
export const RegisterSchema = z.object({
  password: z
    .string()
    .nonempty("Vui lòng nhập mật khẩu")
    .max(20, "Nhập tối đa 20 ký tự")
    .min(3, "nhập tối thiểu 3 ký tự")
    .refine((value) => {
      // Thêm quy tắc xác thực cho mật khẩu
      // Ví dụ: Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một chữ số
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const digitRegex = /[0-9]/;

      return (
        uppercaseRegex.test(value) &&
        lowercaseRegex.test(value) &&
        digitRegex.test(value)
      );
    }, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một chữ số"),
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .email("email không tồn tại "),
  phone: z.string().nonempty("Vui lòng nhập số điện thoại"),
  name: z.string().nonempty("Vui lòng nhập số họ tên"),
  birthday: z.string().nonempty(),
  gender: z.string().nonempty("Vui lòng chọn giới tính"),
});
