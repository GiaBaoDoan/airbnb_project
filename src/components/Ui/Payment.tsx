import { ListRooms, bookRoom } from "types/QuanLyPhong";
import AddGuess from "./AddGuess";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, differenceInDays, format } from "date-fns";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { RootState, useAppDispath } from "store";
import { getMyTrips } from "store/my-travel/thunk";
import { useSelector } from "react-redux";
import { bookRoomThunk } from "store/bookRoom/thunk";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Payment = ({
  detailRoom,
  bookingDate,
  setBookingDate,
}: {
  detailRoom: ListRooms;
  bookingDate?: boolean;
  setBookingDate?: (bookingDate?: boolean) => void;
}) => {
  // states
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pet, setPet] = useState(0);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
    },
  ]);
  const { ThongTinUser } = useSelector(
    (state: RootState) => state.LayThongTinTinReducer
  );
  const { id } = useParams();
  const modalRef = useRef<HTMLDialogElement>(null);
  const dispatch = useAppDispath();
  const { bookingRoomLoading } = useSelector(
    (state: RootState) => state.bookingRoomReducer
  );
  const { myTrips } = useSelector(
    (state: RootState) => state.getMyTripsReducer
  );
  // logicals
  const checkPayment =
    myTrips?.filter((item) => item.maPhong === Number(id)).length > 0;
  const Trip = myTrips?.filter((item) => item.maPhong === Number(id))[0];
  const calcuNight = () => {
    return Math.abs(differenceInDays(date[0].startDate, date[0].endDate));
  };
  const comfirmPay = () => {
    modalRef?.current?.showModal();
  };
  console.log(date);
  const handelPay = async () => {
    const payload: bookRoom = {
      maNguoiDung: ThongTinUser?.id,
      maPhong: detailRoom?.id,
      soLuongKhach: adults + children,
      ngayDen: moment(date[0].startDate).toISOString(),
      ngayDi: moment(date[0].endDate).toISOString(),
    };
    !ThongTinUser || !localStorage.getItem("token")
      ? toast.error("Bạn cần phải đăng nhập trước")
      : await dispatch(bookRoomThunk(payload));
    await dispatch(getMyTrips(String(localStorage.getItem("id"))));
    modalRef?.current.close();
  };
  // hook
  useEffect(() => {
    dispatch(getMyTrips(localStorage.getItem("id")));
  }, []);
  return (
    <CSSContainer>
      <section className="py-5  sticky top-[200px] bottom-0">
        {
          <aside>
            <div className="border-gray-300 bg-white shadow-xl border p-5 rounded-xl">
              <p className="font-medium text-lg py-5 flex justify-between">
                <span className="font-600 text-xl flex items-center space-x-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-dollar-sign"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                  <span>{detailRoom?.giaTien}/ đêm</span>
                </span>
              </p>
              {checkPayment ? (
                <section className="p-3 space-y-5">
                  <div className="text-lg font-600">
                    <span className="font-400">Thời gian đi: </span>
                    <span>
                      {moment(Trip?.ngayDen).format("DD/MM/YYYY")} ~{" "}
                      {moment(Trip?.ngayDi).format("DD/MM/YYYY")}
                    </span>{" "}
                    (
                    <span>
                      {Math.abs(differenceInDays(Trip?.ngayDen, Trip?.ngayDi))}
                    </span>{" "}
                    đêm)
                  </div>
                  <div className="text-lg">
                    <span>Số lượng người: </span>
                    <span className="font-600">{Trip?.soLuongKhach} khách</span>
                  </div>
                </section>
              ) : (
                <section className="rounded-xl cursor-pointer border border-gray-400">
                  <div className="relative">
                    <div
                      onClick={() => setBookingDate(!bookingDate)}
                      className="flex"
                    >
                      <div className="flex-1 border-r border-gray-400 p-3">
                        <p className="font-600">Nhận phòng</p>
                        <span>{format(date[0]?.startDate, "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex-1 p-3">
                        <p className="font-600">Trả phòng</p>
                        <span>{format(date[0]?.endDate, "dd/MM/yyyy")}</span>
                      </div>
                    </div>
                    {bookingDate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        direction="horizontal"
                        ranges={date}
                        months={2}
                        dateDisplayFormat="dd/MM/yyyy" // Định dạng hiển thị của ngày
                        minDate={new Date()}
                        className="border absolute top-[50px] right-[0] bg-white z-10 !text-black rounded-xl p-5 shadow"
                      ></DateRange>
                    )}
                  </div>
                  <div className="dropdown w-full">
                    <div
                      tabIndex={0}
                      role="button"
                      className="flex border-t p-3 items-center border-gray-400"
                    >
                      <div className="flex-1">
                        <p className="font-600">Khách</p>
                        <span>
                          {adults} khách{children > 0 && `, ${children} em bé`}
                          {pet > 0 && `, ${pet} thú cưng`}
                        </span>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          stroke="black"
                          strokeWidth={4}
                          className="h-5 w-5"
                        >
                          <path
                            fill="none"
                            d="M28 12 16.7 23.3a1 1 0 0 1-1.4 0L4 12"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content space-y-5 text-base border border-gray-300 shadow-xl w-full z-[1] menu p-3 bg-white rounded"
                    >
                      <div className="flex justify-between items-center">
                        <section>
                          <p className="font-600 text-lg">Người lớn</p>
                          <p className="">Độ tuổi từ 13 trở lên</p>
                        </section>
                        <AddGuess
                          maxGuess={detailRoom?.khach}
                          isAdult
                          state={adults}
                          setState={setAdults}
                        />
                      </div>
                      <section className="flex justify-between items-center">
                        <section>
                          <p className="font-600 text-lg">Trẻ em</p>
                          <p className="">Độ tuổi từ 2 đến 12 </p>
                        </section>
                        <AddGuess
                          state={children}
                          isChildren
                          setState={setChildren}
                        />
                      </section>
                      <section className="flex items-center justify-between">
                        <section>
                          <p className="font-600 text-lg">Thú cưng</p>
                          <p className="">Chó, mèo...</p>
                        </section>
                        <AddGuess isPet state={pet} setState={setPet} />
                      </section>
                      <p className="text-sm font-500">
                        Chỗ ở này cho phép tối đa 14 khách, không tính em bé.
                        Nếu bạn mang theo nhiều hơn 2 thú cưng, vui lòng báo cho
                        Chủ nhà biết.
                      </p>
                    </ul>
                  </div>
                </section>
              )}

              {/*  */}
              <section className="p-3 flex justify-between items-center">
                <h3 className="font-medium uppercase">Chính sách hủy bỏ</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  stroke="black"
                  strokeWidth={4}
                  className="h-5 w-5"
                >
                  <path
                    fill="none"
                    d="M28 12 16.7 23.3a1 1 0 0 1-1.4 0L4 12"
                  ></path>
                </svg>
              </section>
              <section className="py-5">
                <dialog id="my_modal_3" ref={modalRef} className="modal">
                  <div className="modal-box min-w-[600px]">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-xl">Xác nhận thanh toán</h3>
                    <div className="py-5">
                      <div className="space-y-5">
                        <img
                          className="rounded-xl"
                          src={detailRoom?.hinhAnh}
                          alt=""
                        />
                        <div className="text-lg space-y-3">
                          <p>
                            <span className="font-medium">
                              Ngày đặt phòng:{" "}
                            </span>
                            <span className="font-600">
                              {format(date[0]?.startDate, "dd/MM/yyyy")} ~{" "}
                              {format(date[0]?.endDate, "dd/MM/yyyy")}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium">
                              Lựa chọn của bạn:{" "}
                            </span>
                            <span className="font-600">
                              {adults} khách
                              {children > 0 && `, ${children} em bé`}
                              {pet > 0 && `, ${pet} thú cưng`}
                            </span>
                          </p>
                        </div>
                        <hr />
                        <p className="text-lg font-medium">
                          {detailRoom?.phongNgu} Phòng ngủ ~{" "}
                          {detailRoom?.phongTam} phòng tắm ~{" "}
                          {detailRoom?.giuong} giường
                        </p>
                        <section className="pt-5 space-y-5">
                          <div className="grid-cols-3 grid gap-5">
                            <p
                              className={`${
                                !detailRoom?.wifi && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z"></path>
                              </svg>
                              <span>Wifi</span>
                            </p>
                            <p
                              className={`${
                                !detailRoom?.doXe && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z"></path>
                              </svg>
                              <span className="">Đỗ xe</span>
                            </p>
                            <p
                              className={`${
                                !detailRoom?.tivi && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z"></path>
                              </svg>
                              <span>TV</span>
                            </p>
                            <div className="space-x-3 flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                className="h-7 w-7"
                                role="presentation"
                                focusable="false"
                              >
                                <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z"></path>
                              </svg>
                              <span>Không gian</span>
                            </div>
                            <p
                              className={`${
                                !detailRoom?.bep && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z"></path>
                              </svg>
                              <span>Bếp ăn</span>
                            </p>
                            <p
                              className={`${
                                !detailRoom?.banLa && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.03 3h.3a12.5 12.5 0 0 1 11.82 9.48l.07.3 1.73 7.79.03.14A2 2 0 0 1 28.15 23H2.1a2 2 0 0 1-1.85-1.84v-7.38a5 5 0 0 1 4.77-4.77L5.25 9h9V5h-14V3zm11.53 16H2.25v2H28zM16.24 5v6H5.07a3 3 0 0 0-2.82 2.82V17H27.1l-.84-3.78-.07-.28a10.5 10.5 0 0 0-9.6-7.92L16.32 5z"></path>
                              </svg>
                              <span>Bàn là</span>
                            </p>
                            <p
                              className={`${
                                !detailRoom?.dieuHoa && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M17 1v4.03l4.03-2.32 1 1.73L17 7.34v6.93l6-3.47V5h2v4.65l3.49-2.02 1 1.74L26 11.38l4.03 2.33-1 1.73-5.03-2.9L18 16l6 3.46 5.03-2.9 1 1.73L26 20.62l3.49 2.01-1 1.74L25 22.35V27h-2v-5.8l-6-3.47v6.93l5.03 2.9-1 1.73L17 26.97V31h-2v-4.03l-4.03 2.32-1-1.73 5.03-2.9v-6.93L9 21.2V27H7v-4.65l-3.49 2.02-1-1.74L6 20.62l-4.03-2.33 1-1.73L8 19.46 14 16l-6-3.46-5.03 2.9-1-1.73L6 11.38 2.51 9.37l1-1.74L7 9.65V5h2v5.8l6 3.47V7.34l-5.03-2.9 1-1.73L15 5.03V1z"></path>
                              </svg>
                              <span>Điều hòa</span>
                            </p>
                            <p
                              className={`${
                                !detailRoom?.hoBoi && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M28 2a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H4v15.5h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 18c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1v3h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 23c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1V28h24zm-6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                              </svg>
                              <span>Hồ bơi</span>
                            </p>
                          </div>
                          <div>
                            <p
                              className={`${
                                detailRoom?.mayGiat && "line-through"
                              } flex items-center space-x-3`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="w-7 h-7"
                              >
                                <path d="M26.29 2a3 3 0 0 1 2.96 2.58c.5 3.56.75 7.37.75 11.42s-.25 7.86-.75 11.42a3 3 0 0 1-2.79 2.57l-.17.01H5.7a3 3 0 0 1-2.96-2.58C2.25 23.86 2 20.05 2 16s.25-7.86.75-11.42a3 3 0 0 1 2.79-2.57L5.7 2zm0 2H5.72a1 1 0 0 0-1 .86A80.6 80.6 0 0 0 4 16c0 3.96.24 7.67.73 11.14a1 1 0 0 0 .87.85l.11.01h20.57a1 1 0 0 0 1-.86c.48-3.47.72-7.18.72-11.14 0-3.96-.24-7.67-.73-11.14A1 1 0 0 0 26.3 4zM16 7a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-5.84 7.5c-.34 0-.68.02-1.02.07a7 7 0 0 0 13.1 4.58 9.09 9.09 0 0 1-6.9-2.37l-.23-.23a6.97 6.97 0 0 0-4.95-2.05zM16 9a7 7 0 0 0-6.07 3.5h.23c2.26 0 4.44.84 6.12 2.4l.24.24a6.98 6.98 0 0 0 6.4 1.9A7 7 0 0 0 16 9zM7 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                              </svg>
                              <span>Máy giặt</span>
                            </p>
                          </div>
                        </section>
                        <br />
                        <hr />
                        <div className="flex justify-end">
                          <button
                            onClick={handelPay}
                            disabled={bookingRoomLoading}
                            className={`bg-black p-3 font-600 rounded-lg text-white ${
                              bookingRoomLoading
                                ? "cursor-no-drop bg-gray-300 "
                                : ""
                            }`}
                          >
                            Thanh toán $
                            {(detailRoom?.giaTien * calcuNight() * 1.2).toFixed(
                              1
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
                {!checkPayment ? (
                  <button
                    onClick={comfirmPay}
                    className="payment w-full p-5 rounded-xl text-xl font-600 text-white"
                  >
                    Thanh toán
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="bg-gray-300 cursor-no-drop w-full p-5 rounded-xl text-xl font-600 text-white"
                  >
                    Đã thanh toán
                  </button>
                )}
                <p className="text-center mt-5">Bạn vẫn chưa bị trừ tiền?</p>
              </section>
              {/* bill */}
              {!checkPayment && (
                <section className="py-5 space-y-5">
                  <p className="underline flex justify-between text-xl">
                    <span>
                      <span>$</span>
                      {detailRoom?.giaTien}x{calcuNight()} đêm
                    </span>
                    <span>${detailRoom?.giaTien * calcuNight()}</span>
                  </p>
                  <p className="underline flex justify-between text-xl">
                    <span>Phí dịch vụ Airbnb</span>
                    <span>
                      ${(detailRoom?.giaTien * 0.2 * calcuNight()).toFixed(1)}
                    </span>
                  </p>
                </section>
              )}
              <hr />
              <section className="py-5 flex text-xl font-semibold justify-between items-center">
                {checkPayment ? (
                  <span>Đã thanh toán</span>
                ) : (
                  <span>Tổng trước thuế</span>
                )}
                {checkPayment ? (
                  <span>
                    $
                    {(
                      detailRoom?.giaTien *
                      Math.abs(differenceInDays(Trip?.ngayDen, Trip?.ngayDi)) *
                      1.2
                    ).toFixed(1)}
                  </span>
                ) : (
                  <span>
                    ${(detailRoom?.giaTien * 1.2 * calcuNight()).toFixed(1)}
                  </span>
                )}
              </section>
            </div>
          </aside>
        }
      </section>
    </CSSContainer>
  );
};
const CSSContainer = styled.div`
  .payment {
    background: radial-gradient(
      circle at left,
      #ff385c 0%,
      #e61e4d 27.5%,
      #e31c5f 40%,
      #d70466 57.5%,
      #bd1e59 75%,
      #bd1e59 100%
    ) !important;
  }
`;
export default Payment;
