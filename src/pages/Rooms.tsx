import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Popover } from "antd";
const { Search } = Input;
import { Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useAppDispath, RootState } from "store";
import {
  PostRoomThunk,
  deleteRoomThunk,
  renderListRoomsThunk,
} from "store/AdminStore/thunk";
import { StretchHorizontal, LayoutGrid, Trash2, PenSquare } from "lucide-react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { updateRoomThunk } from "store/UpdateRoom/thunk";
const Rooms = () => {
  <ToastContainer />;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ListRooms } = useSelector(
    (state: RootState) => state.RenderListRoomsReducer
  );
  const { ThongTinUser } = useSelector(
    (state: RootState) => state.LayThongTinTinReducer
  );
  console.log(ThongTinUser);
  const { handleSubmit, register, reset } = useForm({
    mode: "onChange",
  });
  const editRooms = (item) => {
    setAddOrEdit(false);
    if (item.id > 21) {
      if (!localStorage.getItem("token") || ThongTinUser.role != "ADMIN") {
        Swal.fire({
          title: "Bạn chưa có tài khoản ADMIN",
          text: "Hãy tạo và bạn có thể quản lý các phòng",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tạo tài khoản admin",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(PATH.adduser);
          }
        });
      } else {
        setIsModalOpen(true);
        const data = ListRooms?.find((x) => {
          return x.id == item.id;
        });
        reset({ ...data });
      }
    } else {
      setIsModalOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Đây là các phòng khởi tạo mẫu bạn không thể chỉnh sửa",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
  };
  const onSubmit = (payload) => {
    dispatch(PostRoomThunk(payload))
      .unwrap()
      .then(() => {
        dispatch(renderListRoomsThunk());
        Swal.fire("Done!", "Thêm phòng thành công", "success");
      })
      .catch();
  };
  const onSubmitUpdate = (data) => {
    const param = { id: data?.id, payload: data };
    dispatch(updateRoomThunk(param))
      .unwrap()
      .then(() => {
        dispatch(renderListRoomsThunk());
        setIsModalOpen(false);
        Swal.fire("Done!", "Cập nhật thành công", "success");
      })
      .catch((err) => {
        if (err.content.statusCode == 403) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn cần tạo tài khoản với vai trò admin trước",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      });
  };
  const [addOrEdit, setAddOrEdit] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const { value } = useSelector((state: RootState) => state.SetPixceReducer);
  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(renderListRoomsThunk());
  }, []);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Picture",
      dataIndex: "hinhAnh",
    },
    {
      title: "Room name",
      dataIndex: "tenPhong",
      key: "tenPhong",
    },
    {
      title: "Customers",
      dataIndex: "khach",
      key: "khach",
    },
    {
      title: "Bedroom",
      dataIndex: "phongNgu",
      key: "phongNgu",
    },
    {
      title: "Bed",
      dataIndex: "giuong",
      key: "giuong",
    },
    {
      title: "Bathroom",
      dataIndex: "phongTam",
      key: "phongTam",
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
    },
    {
      title: "Other services",
      dataIndex: "otherServices",
      key: "otherServices",
    },
    {
      title: "Desciption",
      dataIndex: "moTa",
      key: "moTa",
    },

    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];
  const dataSource = ListRooms?.map((item, index) => {
    return {
      id: item?.id,
      hinhAnh: (
        <img
          src={`${item?.hinhAnh}`}
          className="h-[100px] w-full rounded-[10px]"
          alt=""
        />
      ),
      tenPhong:
        item.tenPhong.length > 20
          ? item.tenPhong.substring(0, 20) + "..."
          : item.tenPhong,

      khach: item.khach,
      phongNgu: item.phongNgu,
      giuong: item.giuong,
      phongTam: item.phongTam,
      otherServices: (
        <Popover
          key={index}
          style={{ width: 500 }}
          content={
            <div>
              {item?.banLa ? <span>Bàn là,</span> : ""}
              {item?.mayGiat ? <span className=""> Máy giặt,</span> : ""}
              {item?.dieuHoa ? <span> Điều hòa,</span> : ""}
              {item?.bep ? <span> Bếp,</span> : ""}
              {item?.wifi ? <span> Wifi,</span> : ""}
              {item?.tivi ? <span> Tivi,</span> : ""}
              {item?.doXe ? <span> Bãi đổ xe,</span> : ""}
              {item?.hoBoi ? <span> Hồ bơi,</span> : ""}
            </div>
          }
          // title="Hover title"
          trigger="hover"
          open={hovered}
          onOpenChange={(open) => {
            setHovered(open);
          }}
        >
          <div key={item?.id}>Máy giặt...</div>
        </Popover>
      ),
      moTa:
        item.moTa.length > 50 ? item.moTa.substring(0, 50) + "..." : item.moTa,
      giaTien: (
        <span>
          {item.giaTien} <span className="font-700">$</span>
        </span>
      ),
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
                  if (
                    ThongTinUser?.role != "ADMIN" ||
                    !localStorage.getItem("token")
                  ) {
                    Swal.fire({
                      title: "Bạn chưa có tài khoản ADMIN",
                      text: "Hãy tạo và bạn có thể quản lý các phòng",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Tạo tài khoản admin",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(PATH.adduser);
                      }
                    });
                  } else {
                    await dispatch(deleteRoomThunk(String(item?.id)))
                      .unwrap()
                      .then(async () => {
                        dispatch(renderListRoomsThunk());
                        Swal.fire("Deleted!", "Xóa thành công.", "success");
                      })
                      .catch((err) => {
                        if (err.response.data.statusCode == 403) {
                          Swal.fire({
                            title: "Bạn chưa có tài khoản ADMIN",
                            text: "Hãy tạo và bạn có thể quản lý các phòng",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Tạo tài khoản admin",
                          }).then(() => {
                            if (result.isConfirmed) {
                              navigate(PATH.adduser);
                            }
                          });
                        }
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Đây là các phòng khởi tạo mẫu bạn không thể xóa",
                          footer: '<a href="">Why do I have this issue?</a>',
                        });
                      });
                  }
                }
              });
            }}
            type="primary"
            danger
          >
            <Trash2 />
          </Button>{" "}
          <Button
            onClick={() => editRooms(item)}
            className="edit"
            type="primary"
          >
            <PenSquare />
          </Button>
        </div>
      ),
    };
  });

  return (
    <div className={`bg-[rgba(0,0,0,0.03)] `}>
      <AdminCss
        className={`${
          value ? "ml-[150px] w-[90%] " : "ml-[270px] w-[85%] "
        } transition-all`}
      >
        <div className="p-[10px]">
          <div className="py-[20px] flex mb-[20px]   justify-between">
            <h3 className="text-4xl font-500 py-5 text-left "> Rooms </h3>
            <div className="flex items-center  justify-around">
              <StretchHorizontal className="icon rounded-[8px]" />
              <LayoutGrid className="icon" />
              <Search
                placeholder="input search id"
                enterButton={<SearchOutlined />}
                size="small"
                className="mr-[10px]"
                // onChange={sortName}
              />

              <button
                className="btn add-user"
                onClick={() => {
                  setIsModalOpen(true);
                  setAddOrEdit(true);
                  reset({
                    tenPhong: "",
                    khach: 0,
                    phongNgu: 0,
                    giuong: 0,
                    phongTam: 0,
                    moTa: "",
                    giaTien: 0,
                    mayGiat: false,
                    banLa: false,
                    tivi: false,
                    dieuHoa: false,
                    wifi: false,
                    bep: false,
                    doXe: false,
                    hoBoi: false,
                    banUi: false,
                    maViTri: 0,
                    hinhAnh: "",
                  });
                }}
              >
                ADD ROOMS
              </button>
            </div>
          </div>
          <Table
            className="!rounded-[20px] striped-table "
            columns={columns}
            dataSource={dataSource}
          />
        </div>
        <Modal
          className="Modal !w-[1000px] pb-[20px]"
          onCancel={() => setIsModalOpen(false)}
          open={isModalOpen}
          okButtonProps={{ style: { display: "none" } }}
        >
          <form
            className="Wrap-Modal pb-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="font-600 p-[10px] text-[22px] text-white bg-mainColor">
              ADD ROOM
            </div>
            <div className="">
              <div className="mt-[10px] grid grid-cols-2 space-x-[30px]">
                <div className="">
                  <div>
                    <p className="text-[20px] font-500">Tên phòng</p>
                    <input
                      {...register("tenPhong")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="text"
                      placeholder="Room name"
                    />
                  </div>
                  <div>
                    <p className="text-[20px] font-500">Mô tả</p>
                    <input
                      {...register("moTa")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="text"
                      placeholder="Descrition"
                    />
                  </div>
                  <div>
                    <p className="text-[20px] font-500">Giá tiền</p>
                    <input
                      {...register("giaTien")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="number"
                      placeholder="Price"
                    />
                  </div>
                  <div>
                    <p className="text-[20px] font-500">Hình ảnh</p>
                    <input
                      {...register("hinhAnh")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="text"
                      placeholder="Link picture Online"
                    />
                  </div>
                  {addOrEdit ? (
                    <button
                      type="submit"
                      className="bg-mainColor text-[18px] font-500 p-[10px] rounded-[10px] text-white"
                    >
                      Add Room
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmitUpdate)}
                      className="bg-mainColor text-[18px] font-500 p-[10px] rounded-[10px] text-white"
                    >
                      Update Room
                    </button>
                  )}
                </div>
                <div className="">
                  <div className="my-[10px]">
                    <div className="flex items-center space-x-3">
                      <input
                        {...register("mayGiat")}
                        type="checkbox"
                        name="mayGiat"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Máy giặt</span>
                    </div>
                  </div>
                  <div className="my-[10px]  ">
                    <div className="flex items-center space-x-3">
                      <input
                        {...register("banLa")}
                        name="banLa"
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Bà là</span>
                    </div>
                  </div>
                  <div className="my-[10px]">
                    <div className="flex items-center  space-x-3">
                      <input
                        {...register("tivi")}
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Tivi</span>
                    </div>
                  </div>
                  <div className="my-[10px]">
                    <div className="flex items-center space-x-3">
                      <input
                        {...register("dieuHoa")}
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Điều hòa</span>
                    </div>
                  </div>
                  <div className="my-[10px]  ">
                    <div className="flex items-center space-x-3">
                      <input
                        {...register("wifi")}
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Wifi</span>
                    </div>
                  </div>
                  <div className="my-[10px]">
                    <div className="flex items-center space-x-3">
                      <input
                        {...register("bep")}
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Bếp</span>
                    </div>
                  </div>
                  <div className="my-[10px]  ">
                    <div className="flex items-center space-x-3">
                      <input
                        {...register("doXe")}
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Đổ xe</span>
                    </div>
                  </div>
                  <div className="my-[10px]">
                    <div className="flex items-center  space-x-3">
                      <input
                        {...register("hoBoi")}
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Hồ bơi</span>
                    </div>
                  </div>
                  <div className="my-[10px]">
                    <div className="flex items-center  space-x-3">
                      <input
                        {...register("banUi")}
                        type="checkbox"
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                      <span className="text-[16px] font-500">Bàn ủi</span>
                    </div>
                  </div>
                  <div className="w-[30%]">
                    <input
                      {...register("giuong")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="number"
                      placeholder="beds"
                    />
                  </div>
                  <div className="w-[30%]">
                    <input
                      {...register("khach")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="number"
                      placeholder="guest"
                    />
                  </div>
                  <div className="w-[30%]">
                    <input
                      {...register("phongNgu")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="number"
                      placeholder="bedrooms"
                    />
                  </div>
                  <div className="w-[30%]">
                    <input
                      {...register("phongTam")}
                      style={{
                        marginTop: "10px",
                        outline: "none",
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
                      type="number"
                      placeholder="bathrooms"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </AdminCss>
    </div>
  );
};
const AdminCss = styled.div`
  input {
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
    background-color: #3498db;
    border: 2px solid transparent;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    transition: 0.3s all;
    font-weight: bold;
    &:hover {
      background-color: transparent;
      color: #3498db;
      border: 2px solid #3498db;
    }
  }
  .Modal {
    input {
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 50px !important;
      outline: none;
      padding: 10px;
      margin-right: 10px;
      width: 70%;
      box-sizing: border-box;
      font-family: montserrat;
      color: #2c3e50;
      font-size: 20px;
    }
  }
  .ant-modal-content {
    padding: 0px !important;
    border-radius: 20px !important;
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
      background-color: #3498db;
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
    text-align: center;
    font-size: 20px !important;
  }
  .edit {
    background-color: #1677ff;
  }
  .ant-input-group-addon {
    background-color: #1677ff;
  }
`;
export default Rooms;
