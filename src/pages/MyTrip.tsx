import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import { HuyChuyenThunk } from "store/huy-chuyen/thunk";
import { toast } from "react-toastify";
import { RootState, useAppDispath } from "store";
import { useSelector } from "react-redux";
import { getMyTrips } from "store/my-travel/thunk";
import { useEffect } from "react";
import { getAirbnbListThunk } from "store/quanLyAirbnb/thunk";
import { useNavigate } from "react-router-dom";
import LoadingPage from "components/Ui/LoadingPage";

const MyTrip = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const huyChuyen = async (id: string) => {
    dispatch(HuyChuyenThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Xóa thành công");
        dispatch(getMyTrips(localStorage.getItem("id")));
      })
      .catch((err) => toast.error(err?.response?.data?.content));
  };
  const { myTrips, isLoading } = useSelector(
    (state: RootState) => state.getMyTripsReducer
  );
  const { AirbnbList } = useSelector((state: RootState) => state.quanLyAirbnb);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getMyTrips(localStorage.getItem("id")));
      dispatch(getAirbnbListThunk());
    }
  }, []);
  if (isLoading) return <LoadingPage />;
  return myTrips.length > 0 ? (
    <section className="pt-5 pb-12 space-y-5 max-sm:w-[90%] w-[95%] mx-auto">
      {myTrips.length > 0 && (
        <div className="space-y-3">
          <article className="flex items-center space-x-3">
            <h2 className="text-2xl font-600 max-sm:text-lg">
              Chuyến đi của bạn
            </h2>
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
              className="lucide lucide-plane"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </article>
          <div>
            <p className="text-lg max-sm:text-base font-500">
              Chúng tôi chúc bạn có chuyến đi vui vẻ và có trải nghiệm tuyệt vời
              nhất
            </p>
            <div className="flex items-center space-x-3 mt-3">
              <p className="text-xl font-500">Có {myTrips.length} chuyến đi</p>
              <button className="border rounded border-black/70 hover:bg-black/10 bg-black/5 px-3 py-4 font-500">
                Let's go
              </button>
            </div>
          </div>
        </div>
      )}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          758: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {myTrips?.map((trip) => {
          return (
            <SwiperSlide key={trip.id}>
              <section>
                <div className="cursor-pointer overflow-hidden rounded-tl-xl rounded-tr-xl">
                  <img
                    className="h-[264px] hover:scale-110 transition-all object-cover"
                    src={
                      AirbnbList?.filter((item) => item.id === trip.maPhong)[0]
                        ?.hinhAnh
                    }
                    alt=""
                  />
                </div>
                <div className="border rounded-bl-xl rounded-br-xl p-5 y-7 space-y-5">
                  <p className="!text-base">
                    Số lượng người:{" "}
                    <span className="font-600">{trip.soLuongKhach} người</span>
                  </p>
                  <p className="!text-base font-600">
                    <span>Ngày đi</span>:{" "}
                    <span className="font-600">
                      {moment(trip.ngayDen).format("DD/MM/YYYY")} ~{" "}
                      {moment(trip.ngayDi).format("DD/MM/YYYY")}
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/detail/${trip.maPhong}`)}
                      className="underline font-600"
                    >
                      Xem chi tiết
                    </button>
                    <button onClick={() => huyChuyen(String(trip?.id))}>
                      Hủy chuyến
                    </button>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  ) : (
    <div className="w-[95%] max-sm:w-[90%] mx-auto space-y-5 py-12">
      <article className="flex items-center space-x-3">
        <h3 className="text-2xl max-sm:text-lg font-bold">Chuyến đi</h3>
      </article>
      <hr />
      <p className="text-xl max-sm:text-lg font-bold">Chưa có chuyến đi nào</p>
      <p className="text-xl max-sm:text-base">
        Đã đến lúc phủi bụi vali và bắt đầu chuẩn bị cho chuyến phiêu lưu tiếp
        theo của bạn rồi.
      </p>
      <button className="border-black max-sm:text-base hover:bg-black/5 rounded hover font-500 text-lg p-3 border">
        Bắt đầu tìm kiếm
      </button>
      <hr />
      <p className="text-lg max-sm:text-sm ">
        Bạn không tìm thấy danh sách yêu thích của mình ở đây?
        <span className="underline font-600">Truy cập Trung tâm trợ giúp</span>
      </p>
    </div>
  );
};

export default MyTrip;
