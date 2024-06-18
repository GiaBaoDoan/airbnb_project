import { Button, Modal } from "antd";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useAppDispath, RootState } from "store";
import { StretchHorizontal, LayoutGrid, Trash2, PenSquare } from "lucide-react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { getLocationThunk } from "store/GetViTri/thunk";
import { deleteLocationThunk } from "store/DeleteLocation/thunk";
import { postLocationThunk } from "store/AddLocation/thunk";
import { updateLocationThunk } from "store/UpdateLocation/thunk";
import { renderListRoomsThunk } from "store/AdminStore/thunk";
const Location = () => {
  <ToastContainer />;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { location } = useSelector(
    (state: RootState) => state.getLocationReducer
  );
  const { ThongTinUser } = useSelector(
    (state: RootState) => state?.LayThongTinTinReducer
  );
  const { handleSubmit, register, reset } = useForm({
    mode: "onChange",
  });
  const editRooms = (item) => {
    setAddOrEdit(false);
    if (item.id > 8) {
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
        const data = location?.find((x) => {
          return x.id == item.id;
        });
        reset({ ...data });
      }
    } else {
      setIsModalOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Các địa điểm từ 1 đến 8 là các địa điểm khởi tạo mẫu bạn không thể chỉnh sửa",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
  };
  const onSubmit = (payload) => {
    dispatch(postLocationThunk(payload))
      .unwrap()
      .then(() => {
        dispatch(getLocationThunk());
        Swal.fire("Done!", "Thêm phòng thành công", "success");
        setIsModalOpen(false);
      })
      .catch();
  };
  const onSubmitUpdate = (data) => {
    const param = { id: data?.id, data };
    dispatch(updateLocationThunk(param))
      .unwrap()
      .then(() => {
        dispatch(getLocationThunk());
        Swal.fire("Done!", "Cập nhật thành công", "success");
        setIsModalOpen(false);
      })
      .catch(() => {
        if (!localStorage.getItem("token")) {
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
        }
      });
  };
  const [addOrEdit, setAddOrEdit] = useState<boolean>(true);
  const navigate = useNavigate();
  const { value } = useSelector((state: RootState) => state.SetPixceReducer);
  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(getLocationThunk());
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
      title: "Place",
      dataIndex: "tenViTri",
      key: "tenVitri",
    },
    {
      title: "province",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
    },
    {
      title: "Country",
      dataIndex: "quocGia",
      key: "quocGia",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const dataSource = location?.map((item) => {
    return {
      id: item?.id,
      hinhAnh: <img className="w-[150px] h-[150px]" src={`${item?.hinhAnh}`} />,
      tenViTri: item?.tenViTri,
      tinhThanh: item?.tinhThanh,
      quocGia: item?.quocGia,
      action: (
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
                    }).then(() => {
                      if (result.isConfirmed) {
                        navigate(PATH.adduser);
                      } else {
                        return;
                      }
                    });
                  } else {
                    await dispatch(deleteLocationThunk(item?.id))
                      .unwrap()
                      .then(async () => {
                        dispatch(renderListRoomsThunk());
                        dispatch(getLocationThunk());
                        Swal.fire("Deleted!", "Xóa thành công.", "success");
                      })
                      .catch(() => {});
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
              <button
                className="btn add-user"
                onClick={() => {
                  setIsModalOpen(true);
                  setAddOrEdit(true);
                  reset({
                    tenViTri: "",
                    tinhThanh: "",
                    quocGia: "",
                    hinhAnh: "",
                  });
                }}
              >
                ADD LOCATION
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
              ADD Location
            </div>
            <div className="">
              <div className="mt-[10px]">
                <div>
                  <p className="text-[20px] font-500">Tên vị trí</p>
                  <input
                    {...register("tenViTri")}
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
                    placeholder="Placement"
                  />
                </div>
                <div>
                  <p className="text-[20px] font-500">Tỉnh thành</p>
                  <input
                    {...register("tinhThanh")}
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
                    placeholder="Province"
                  />
                </div>
                <div>
                  <p className="text-[20px] font-500">Quốc gia </p>
                  <input
                    {...register("quocGia")}
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
                    placeholder="Country"
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
                    placeholder="link picture online"
                  />
                </div>
              </div>
            </div>
            {addOrEdit ? (
              <button className="bg-mainColor text-white font-500 p-[10px] rounded-[5px]">
                Add Location
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit(onSubmitUpdate)}
                className="bg-mainColor text-white font-500 p-[10px] rounded-[5px]"
              >
                Update Location
              </button>
            )}
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
    text-align: left;
    font-size: 20px !important;
  }
  .edit {
    background-color: #1677ff;
  }
  .ant-input-group-addon {
    background-color: #1677ff;
  }
`;
export default Location;
