import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker } from "antd";
import { Input } from "components/Ui/Input";
import { PATH } from "constant";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUserSchema } from "schema";
import { useAppDispath } from "store";
import { AddUserThunk } from "store/AdminStore/thunk";
import styled from "styled-components";
import Swal from "sweetalert2";

const AddUsers = () => {
  const dispatch = useAppDispath();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(addUserSchema),
  });
  const [error, setError] = useState<string>();
  const handelChangeDatePicker = (date) => {
    setValue("birthday", date ? date.format("DD/MM/YYYY") : null);
    if (date == null) {
      setError("Vui lòng nhập ngày sinh");
    } else {
      setError("");
    }
  };
  const onSubmit = (data) => {
    dispatch(AddUserThunk(data))
      .unwrap()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add user has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(PATH.Login);
      })
      .catch((err) => {
        toast.error(err.response.data.content);
      });
  };
  return (
    <div className="bg-[rgba(0,0,0,0.1)] h-[110vh] ">
      <AddUsersCSS className="mx-auto w-[80%] p-[100px] ml-[350px] overflow-hidden ">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="Form overflow-hidden border border-[rgba(0,0,0,0.2)] shadow-sm rounded-[10px] xl:w-[1000px] pb-[50px] sm:w-[600px] md:w-[600px] lg:w-[800px]  p-[10px]  bg-white "
        >
          <div className="w-full flex">
            <h2 className="text-[35px] mt-[20px] flex w-full justify-center text-[#00308F] font-600">
              ADD USER
            </h2>
          </div>
          <div className="p-[20px]">
            <div className="mb-[14px] grid grid-cols-2">
              <div className="mr-[20px]">
                <label className="block mb-2 text-sm outline-none font-medium text-gray-900 dark:text-white">
                  Tên người dùng
                </label>
                <Input
                  register={register}
                  name="name"
                  type="text"
                  error={errors?.name?.message as string}
                  placeholder="Nguyễn Văn A..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm outline-none font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <Input
                  error={errors?.email?.message as string}
                  register={register}
                  type="email"
                  name="email"
                  placeholder="NguyenVanA@gmai.com"
                />
              </div>
            </div>
            <div className="mb-[14px] grid grid-cols-2">
              <div className="mr-[20px]">
                <label className="block mb-2 text-sm outline-none font-medium text-gray-900 dark:text-white">
                  Số điện thoại
                </label>
                <Input
                  register={register}
                  error={errors?.phone?.message as string}
                  name="phone"
                  type="text"
                  placeholder="079 776 1221.."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mật khẩu
                </label>
                <Input
                  name="password"
                  error={errors?.password?.message as string}
                  type="password"
                  register={register}
                  placeholder="********"
                />
              </div>
            </div>
            <div className="mb-[14px]  grid grid-cols-2">
              <div className="mr-[20px]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Giới tính
                </label>
                <select
                  {...register("gender")}
                  id="countries_disabled"
                  className={
                    errors?.gender
                      ? "outline-none hover:border-[#4096ff] focus:border-[#4096ff] block w-full !border-red-500"
                      : "outline-none hover:border-[#4096ff] focus:border-[#4096ff] block w-full"
                  }
                >
                  <option value="">Gender</option>
                  <option value="true">Male</option>
                  <option value="false">FeMale</option>
                </select>
                {errors.gender && (
                  <p className="!text-red-500 text-[20px] flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[32px] text-[50px] h-[32px] text-white font-800 align-bottom mr-[5px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    {errors.gender.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                  Ngày sinh
                </label>
                <DatePicker
                  {...register("birthday")}
                  name="birthday"
                  id="myDatePicker"
                  onChange={handelChangeDatePicker}
                  className={
                    error
                      ? "w-full !border-red-500 birthday hover:!border-red-500 focus:!border-red-500"
                      : "w-full  birthday hover:!border-[#4096ff] focus:!border-[#4096ff]"
                  }
                  placeholder="Birthday"
                  format={"DD/MM/YYYY"}
                />
                {error && (
                  <p className="!text-red-500 text-[20px]  flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[32px] text-[50px] h-[32px] text-white font-800 align-bottom mr-[5px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    {error}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-[14px]  grid grid-cols-2">
              <div className="mr-[20px]">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Loại người dùng
                </label>
                <select
                  {...register("role")}
                  id="countries_disabled"
                  className={
                    errors?.gender
                      ? "outline-none hover:border-[#4096ff] focus:border-[#4096ff] block w-full !border-red-500"
                      : "outline-none hover:border-[#4096ff] focus:border-[#4096ff] block w-full"
                  }
                >
                  <option value="">Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
                {errors.gender && (
                  <p className="!text-red-500 text-[20px] flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-[32px] text-[50px] h-[32px] text-white font-800 align-bottom mr-[5px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    {errors.role.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={() => {
                const date = document.getElementById(
                  "myDatePicker"
                ) as HTMLInputElement;
                if (date.value == "") {
                  setError("Vui lòng nhập ngày sinh");
                }
              }}
              htmlType="submit"
              type="primary"
              className="bg-red-600  rounded-[10px] sm:w-[400px] lg:w-[600px] text-[20px] h-[50px] "
              danger
            >
              Tạo tài khoản
            </Button>
            <div
              className="text-[#FF4500] mt-[10px] cursor-pointer text-[20px] "
              onClick={() => navigate(PATH.Login)}
            >
              Đã có tài khoản ADMIN ?
            </div>
          </div>
        </form>
      </AddUsersCSS>
    </div>
  );
};

const AddUsersCSS = styled.div`
  /* height: 100vh; */
  label {
    font-size: 18px;
    margin-bottom: 10px;
  }
  input,
  select,
  .birthday {
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2c3e50;
    font-size: 14px;
    background: transparent;
  }
  .birthday {
    margin: 0;
    padding: 8px;
  }
  .birthday input {
    font-size: 14px;
    padding: 6px;
    margin: 0 !important;
  }
`;
export default AddUsers;
