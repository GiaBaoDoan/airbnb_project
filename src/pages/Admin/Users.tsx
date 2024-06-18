import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Modal, Input, DatePicker } from "antd";
const { Search } = Input;
import { Table } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { upDateUser } from "schema";
import { useAppDispath, RootState } from "store";
import { deleteThunk, renderThunk } from "store/AdminStore/thunk";
import { capNhatThongTinThunk } from "store/CapNhatThongTin/thunk";
import { StretchHorizontal, LayoutGrid, Trash2, PenSquare } from "lucide-react";

import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
const Users = () => {
  <ToastContainer />;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState<string>();
  const { ListUser } = useSelector((state: RootState) => state.RenderListUsersReducers);
  const [dateString, setDateString] = useState<any>();
  const [isNullDate, setIsNullDate] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const [ListName, setListName] = useState<any>();
  const sortName = (e) => {
    const keyword = e.target.value;
    const ListName = ListUser?.filter((item) => item?.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
    setState(keyword);
    setListName(ListName);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(upDateUser),
  });

  const onSubmit = (payload) => {
    const param = { id: String(payload?.id), payload };
    dispatch(capNhatThongTinThunk(param))
      .unwrap()
      .then(async () => {
        await dispatch(renderThunk());
        Swal.fire("Done!", "Cập nhật thông tin thành công", "success");
      })
      .catch((err) => console.log(err));
  };
  const { value } = useSelector((state: RootState) => state.SetPixceReducer);
  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(renderThunk());
    if (state) {
      const ListName = ListUser?.filter((item) => item?.name.toLocaleLowerCase().includes(state.toLocaleLowerCase()));
      setListName(ListName);
    }
  }, [ListUser]);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];
  const handelChangeDatePicker = (date) => {
    if (date) {
      setValue("birthday", date.format("DD/MM/YYYY"));
      setDateString(moment(moment(date.format("DD/MM/YYYY"), "DD/MM/YYYY")));
      setIsNullDate(true);
      setError("");
    } else {
      setError("Vui lòng nhập ngày tháng");
      setValue("birthday", null);
      setIsNullDate(false);
    }
  };
  const dataSource = (state ? ListName : ListUser)?.map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      email: item.email,
      avatar: item.avatar ? (
        <img src={item?.avatar} style={{ width: "100px", height: "100px" }} alt="" />
      ) : (
        <Avatar size={60} icon={<UserOutlined />} />
      ),
      role: item?.role,
      Action: (
        <div>
          <Button
            onClick={() => {
              Swal.fire({
                title: "Bạn có muốn xóa không",
                text: "Trường này sẽ bị xóa vĩnh viễn",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Xác nhận xóa",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await dispatch(deleteThunk(String(item?.id)))
                    .unwrap()
                    .then(async () => {
                      Swal.fire("Deleted!", "Xóa thành công.", "success");
                    })
                    .catch((err) => console.log(err));
                }
              });
            }}
            type="primary"
            danger
          >
            <Trash2 />
          </Button>{" "}
          <Button
            className="edit"
            onClick={() => {
              const data = ListUser?.find((x) => {
                return x.id == item.id;
              });
              reset({
                ...data,
                gender: String(data?.gender),
              });
              setDateString(moment(moment(data?.birthday, "DD/MM/YYYY")));
              setIsModalOpen(true);
            }}
            type="primary"
          >
            <PenSquare />
          </Button>
        </div>
      ),
    };
  });

  return (
    <>
      <div className={`bg-[rgba(0,0,0,0.03)]  `}>
        <AdminCss className={`${value ? "mx-auto w-[85%] " : "ml-[350px] w-[80%]  "} transition-all max-ip678:items-center  max-ip678:flex   `}>
          <div className="p-[50px] max-ip678:px-[160px]   ">
            <div className="py-[20px] flex mb-[20px] justify-between  ">
              <h3 className="text-4xl font-500 py-5 text-left max-ip678:text-red-600  ">Users </h3>
              <div className="flex items-center  justify-around">
                <StretchHorizontal className="icon rounded-[8px]" />
                <LayoutGrid className="icon" />
                <Search
                  placeholder="input search name"
                  enterButton={<SearchOutlined />}
                  size="small"
                  className="mr-[10px]"
                  onChange={sortName}
                />

                <button className="btn add-user " onClick={() => navigate(PATH.adduser)}>
                  ADD USER
                </button>
              </div>
            </div>
            <Table className="!rounded-[20px] striped-table max-ip678:items-center  max-ip678:flex max-ip678:border-2 max-ip678:border-red-500   " columns={columns} dataSource={dataSource} />

            <Modal
              className="Modal"
              onCancel={() => setIsModalOpen(false)}
              onOk={handleSubmit(onSubmit)}
              open={isModalOpen}
            >
              
              <form className="Wrap-Modal" onSubmit={handleSubmit(() => console.log("helo"))}>
                <div className="">
                  <label className="block mb-2 text-[20px] t outline-none font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500">*</span> Tên người dùng
                  </label>
                  <input
                    className="field"
                    {...register("id")}
                    disabled={true}
                    type="text"
                    style={{
                      marginTop: "10px",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                      fontFamily: "montserrat",
                      color: "#2c3e50",
                      fontSize: "15px",
                    }}
                  />
                </div>
                <div className="">
                  <label className="block mb-2 text-[20px] t outline-none font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500">*</span> Tên người dùng
                  </label>
                  <input
                    className="field"
                    {...register("name")}
                    type="text"
                    style={{
                      marginTop: "10px",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                      fontFamily: "montserrat",
                      color: "#2c3e50",
                      fontSize: "15px",
                    }}
                    placeholder="Nguyễn Văn A..."
                  />
                  <p className="text-red-500 text-[18px]">{errors?.name?.message as string}</p>
                </div>

                <div className="">
                  <label className="block mb-2 text-[20px] t outline-none font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500">*</span> Email
                  </label>
                  <input
                    className="field"
                    {...register("email")}
                    type="text"
                    // error={errors?.name?.message as string}
                    style={{
                      marginTop: "10px",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                      fontFamily: "montserrat",
                      color: "#2c3e50",
                      fontSize: "15px",
                    }}
                    placeholder="NguyenVanA@gmail.com"
                  />
                  <p className="text-red-500 text-[18px]">{errors?.email?.message as string}</p>
                </div>
                <div className="">
                  <label className="block mb-2 text-[20px] t outline-none font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500">*</span>Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="field"
                    style={{
                      marginTop: "10px",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                      fontFamily: "montserrat",
                      color: "#2c3e50",
                      fontSize: "15px",
                    }}
                    placeholder="Nguyễn Văn A..."
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                  <p className="text-red-500 text-[18px]">{errors?.gender?.message as string}</p>
                </div>
                <div className="">
                  <label className="block mb-2 text-[20px] t outline-none font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500">*</span>Loại người dùng
                  </label>
                  <select
                    {...register("role")}
                    className="field"
                    style={{
                      marginTop: "10px",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                      fontFamily: "montserrat",
                      color: "#2c3e50",
                      fontSize: "15px",
                    }}
                  >
                    <option value="">Loại người dùng</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </select>
                  <p className="text-red-500 text-[18px]">{errors?.role?.message as string}</p>
                </div>

                <div>
                  <label className="block text-[20px] mb-[10px]  font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500">*</span> Ngày sinh
                  </label>
                  <DatePicker
                    style={{
                      marginTop: "",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                      fontFamily: "montserrat",
                      color: "#2c3e50",
                      fontSize: "13px",
                    }}
                    {...register("birthday")}
                    value={isNullDate ? dayjs(moment(dateString).format("DD/MM/YYYY"), "DD/MM/YYYY") : null}
                    name="birthday"
                    id="myDatePicker"
                    onChange={handelChangeDatePicker}
                    className="text-[30px] w-full  bg-gray-50"
                    placeholder="DD/MM/YYYY"
                    format={"DD/MM/YYYY"}
                  />
                  <p className="text-red-600 text-[18px]">{error}</p>
                </div>
              </form>
            </Modal>
          </div>
        </AdminCss>
      </div>
    </>
  );
};
const AdminCss = styled.div`
  input,
  select,
  .date {
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 50px;
    outline: none;
    padding: 10px;
    margin-right: 10px;
    width: 70%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2c3e50;
    font-size: 20px;
  }
  .add-user {
    border-color: $blue;
    color: #fff;
    box-shadow: 0 0 40px 40px $blue inset, 0 0 0 0 $blue;
    transition: all 150ms ease-in-out;

    &:hover {
      box-shadow: 0 0 10px 0 $blue inset, 0 0 10px 4px $blue;
    }
  }
  .btn {
    flex-basis: 40%;
    background-color: #FF385C;
    border: 2px solid transparent;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    transition: 0.3s all;
    font-weight: bold;
    &:hover {
      background-color: transparent;
      color: #FF385C;
      border: 2px solid #FF385C;
    }
  }

  .icon {
    cursor: pointer;
    border: 1px solid #ccc;
    width: 80px;
    padding: 12px;
    height: 50px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 20px;
    transition: all 0.3s;
    &:hover {
      background-color: #FF385C;
      color: white;
    }
  }
  label {
    font-size: 50px;
  }
  .striped-table tr:nth-child(even) {
    background-color: #f2f2f2; /* Màu sắc cho các hàng chẵn */
    padding: 50px;
  }
  .ant-table {
    border: 1px solid #cccccc;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  tr th {
    padding: 30px !important;
    background-color: white !important;
    color: black !important;
    font-weight: 00 !important;
  }
  tr th,
  td {
    font-size: 20px !important;
  }
  .edit {
    background-color: #1677ff;
  }
  .ant-input-group-addon {
    background-color: #FF385C;
  }
`;
export default Users;
