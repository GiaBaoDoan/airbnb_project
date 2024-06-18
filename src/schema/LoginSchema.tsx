import { z } from "zod";
export const LoginSchema = z.object({
  password: z
    .string()
    .nonempty("Vui lòng nhập mật khẩu")
    .max(20, "Nhập tối đa 20 ký tự")
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
});
