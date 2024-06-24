import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState, useAppDispath } from "store";
import RatingStar from "../JSON/RatingStar.json";
import detailRoomThunk from "store/detailRoom/thunk";
import LoadingPage from "components/Ui/LoadingPage";
import Star from "components/Ui/icon/Star";
import Payment from "components/Ui/Payment";
import Comments from "components/Ui/Comment";
import Heart from "components/Ui/icon/Heart";
import { useSelector } from "react-redux";
import { getAirbnbCommentThunk } from "store/quanLycomment/thunk";
import { getLocationThunk } from "store/GetViTri/thunk";
const AirBnbDetail = () => {
  const { detailRoom, detailRoomLoading } = useSelector(
    (state: RootState) => state.detailRoom
  );
  const { id } = useParams();
  const { Airbnbcomment } = useSelector(
    (state: RootState) => state.quanlyairbnbComment
  );
  const commentRef = useRef<HTMLElement | null>(null);
  const { location } = useSelector(
    (state: RootState) => state.getLocationReducer
  );
  const pointStar = RatingStar[Number(id) - 1]
    ? String(RatingStar[Number(id) - 1]).replace(".", ",")
    : 3;
  const Bar = () => (
    <section className="flex h-[5px] rounded-full w-full overflow-hidden">
      <div className="bg-black w-full h-full"></div>
      <div className="bg-black/20 w-full h-full"></div>
    </section>
  );
  const detailLocation = location && location[detailRoom?.maViTri - 1];
  const [bookingDate, setBookingDate] = useState<boolean>(false);
  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(detailRoomThunk(Number(id)));
    dispatch(getAirbnbCommentThunk(id));
    dispatch(getLocationThunk());
  }, []);
  if (detailRoomLoading) return <LoadingPage />;
  return (
    <main className="pb-12 sm:pt-5 max-sm:w-[90%] w-[95%] mx-auto">
      <div className="pb-7">
        <article className="flex lg:justify-between items-center">
          <div className="flex-1">
            <div className="flex space-x-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                aria-label="Tiêu đề được dịch tự động: Cabin 1 - Cabin sang trọng bên sườn núi với chế độ xem Batulao"
                role="img"
                focusable="false"
                className="w-7 h-7"
              >
                <path d="M9 0a1 1 0 0 1 1 .88V6h5a1 1 0 0 1 1 .88V15a1 1 0 0 1-.88 1H7a1 1 0 0 1-1-.88V10H1a1 1 0 0 1-1-.88V1a1 1 0 0 1 .88-1H9zm1.73 7-1.4.5.24.21.13.13c.12.13.23.25.3.36l.08.1.05.07.04.08H7.31v1.3h1.2l.17.53.1.26.1.3A6.3 6.3 0 0 0 10 12.61c-.5.32-1.12.61-1.87.87l-.33.11-.35.11-.44.14.72 1.15.4-.13.4-.12c1-.35 1.83-.76 2.48-1.22.57.4 1.28.77 2.12 1.08l.37.14.38.12.41.13.72-1.15-.45-.14-.26-.08-.34-.11a9.23 9.23 0 0 1-1.94-.9 6.3 6.3 0 0 0 1.07-1.7l.13-.31.11-.33.17-.52h1.2V8.45h-3.05l-.1-.23A3.7 3.7 0 0 0 11 7.3l-.12-.15-.14-.15zm1.35 2.76-.04.13-.08.22-.1.27a4.99 4.99 0 0 1-.86 1.38 4.95 4.95 0 0 1-.74-1.13l-.12-.25-.1-.27-.08-.22-.04-.13h2.16zM9 1H1v8h5V7l.01-.17H3.83L3.43 8H2l2.26-6h1.48l1.5 4H9V1zM5 3.41 4.25 5.6h1.5L5 3.41z"></path>
              </svg>
              <h2 className="font-semibold text-3xl max-lg:text-2xl max-sm:text-lg py-5">
                {detailRoom?.tenPhong}
              </h2>
            </div>
            {detailLocation && (
              <div className="flex max-sm:flex-col justify-between w-full">
                <div className="flex flex-1 space-x-3 items-center">
                  <img
                    className="w-9 h-9 max-sm:h-7 max-sm:w-7 object-cover rounded-full"
                    src={detailLocation?.hinhAnh}
                    alt=""
                  />
                  <span className="font-600 text-lg max-sm:text-base">
                    {detailLocation?.tenViTri} - {detailLocation?.tinhThanh} -{" "}
                    {detailLocation?.quocGia}
                  </span>
                </div>
                <section className="flex max-sm:hidden lg:hidden justify-between max-sm:text-base text-lg space-x-5 items-center">
                  <div className="flex items-center space-x-8 underline">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      strokeWidth={2}
                      stroke="black"
                      overflow="visible"
                      className="w-5 h-5 "
                    >
                      <path
                        d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
                        fill="none"
                      ></path>
                    </svg>
                    <span className="font-600 max-sm:text-base">Chia sẻ</span>
                  </div>
                  <div className="flex items-center space-x-8 underline">
                    <Heart
                      stroke="rgba(0,0,0,1)"
                      fill="none"
                      className="w-5 h-5 "
                    />
                    <span className="font-600">Lưu</span>
                  </div>
                </section>
              </div>
            )}
          </div>
          <section className="flex max-lg:hidden text-lg space-x-5 items-center">
            <div className="flex items-center space-x-8 underline">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                strokeWidth={2}
                stroke="black"
                overflow="visible"
                className="w-5 h-5"
              >
                <path
                  d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
                  fill="none"
                ></path>
              </svg>
              <span className="font-600">Chia sẻ</span>
            </div>
            <div className="flex items-center space-x-8 underline">
              <Heart stroke="rgba(0,0,0,1)" fill="none" className="w-5 h-5" />
              <span className="font-600">Lưu</span>
            </div>
          </section>
        </article>
      </div>
      <img
        className="rounded-xl object-cover shadow-lg h-full w-full"
        src={detailRoom?.hinhAnh}
        alt="../"
      />
      <section className="flex sm:hidden py-3 justify-between max-sm:text-base text-lg space-x-5 items-center">
        <div className="flex items-center space-x-8 underline">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            strokeWidth={2}
            stroke="black"
            overflow="visible"
            className="w-5 h-5 max-sm:w-[16px] max-sm:h-[16px]"
          >
            <path
              d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
              fill="none"
            ></path>
          </svg>
          <span className="font-600 ">Chia sẻ</span>
        </div>
        <div className="flex items-center space-x-8 underline">
          <Heart
            stroke="rgba(0,0,0,1)"
            fill="none"
            className="w-5 h-5 max-sm:w-[16px] max-sm:h-[16px]"
          />
          <span className="font-600 ">Lưu</span>
        </div>
      </section>
      <div className="grid-cols-3 grid gap-5 max-xl:grid-cols-1">
        <div className="xl:col-span-2">
          <section className="py-5">
            <div className="text-lg space-y-3">
              <h3 className="font-bold text-2xl max-sm:text-lg ">
                Phòng cung cấp những gì
              </h3>
              <p className="space-x-3 font-medium max-sm:text-base">
                <span>{detailRoom?.khach} Khách</span>
                <span>{detailRoom?.phongNgu} Phòng ngủ</span>
                <span>{detailRoom?.giuong} giường</span>
                <span>{detailRoom?.phongTam} phòng tắm</span>
              </p>
            </div>
            <br />
            {Number(id) >= 5 && Number(id) <= 12 ? (
              <div
                onClick={() => {
                  commentRef?.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="border p-7 max-sm:px-3 w-[90%] max-xl:w-full border-gray-300 items-center  text-xl text-center font-600 rounded-lg my-5 flex space-x-5 justify-between"
              >
                <div className="flex items-center">
                  <img
                    className="object-contain max-sm:w-9 max-sm:h-9"
                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/pdp-shared/components/LaurelItem/ic-system-gf-gold-left-laurel-32-3x.d074c7557225d2a0f3f1289a3dde7a7d.png"
                    alt=""
                  />
                  <span className="max-sm:text-sm">
                    Được khách <br /> yêu thích
                  </span>
                  <img
                    className="object-contain max-sm:w-9 max-sm:h-9"
                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/pdp-shared/components/LaurelItem/ic-system-gf-gold-right-laurel-32-3x.f972b95c999d29e144d9ef970585906d.png"
                    alt=""
                  />
                </div>
                <p className="max-lg:hidden">
                  Khách đánh giá đây là một <br />
                  trong những ngôi nhà được <br />
                  yêu thích nhất trên AirBnb
                </p>
                <div className="text-lg font-500">
                  <span className="font-500 max-sm:text-base">{pointStar}</span>
                  <div className="flex space-x-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        className="max-lg:!w-3 max-lg:!h-3 max-sm:!w-6 max-sm:!h-6"
                        key={index}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl max-sm:text-base">
                    {Airbnbcomment.length}
                  </p>
                  <span className="underline max-sm:text-xs">Đánh giá</span>
                </div>
              </div>
            ) : (
              <div className="flex font-500 items-center space-x-3 text-lg max-sm:justify-between max-sm:text-base">
                <div className="flex items-center space-x-4">
                  <span>
                    <Star className="max-sm:!w-3 max-sm:h-3" />
                  </span>
                  <span>{pointStar}</span>
                </div>
                <span
                  onClick={() => {
                    commentRef?.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="underline"
                >
                  {Airbnbcomment?.length} lượt đánh giá
                </span>
              </div>
            )}
            <br />
            <hr />
            <div className="py-5 flex items-center space-x-5">
              <img
                className="w-16 h-16 max-sm:h-11 max-sm:w-11"
                src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                alt=""
              />
              <div className="text-lg space-y-6">
                <p className="font-bold text-xl max-sm:text-base">
                  Chủ nhà/ Người tổ chức: Ken
                </p>
                <p className="text-gray-500 max-sm:text-base">
                  Chủ nhà siêu cấp với - 2 năm kinh nghiệm đón khách
                </p>
              </div>
            </div>
          </section>
          <hr />
          {/* Features */}
          <section className="py-5 text-xl max-sm:text-base space-y-5">
            <div className="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                strokeWidth={3}
                className="h-9 w-9 max-sm:w-7 max-sm:h-7"
                role="presentation"
                focusable="false"
              >
                <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z"></path>
              </svg>
              <div className="space-y-4">
                <p className="font-bold text-lg max-sm:text-base">
                  Không gian riêng để làm việc
                </p>
                <p className="text-gray-500 text-lg max-sm:text-base">
                  Một khu vực chung có Wi-fi, phù hợp để làm việc.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                strokeWidth={3}
                className="h-9 w-9 max-sm:w-7 max-sm:h-7"
              >
                <path d="M16 17a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM25.67.33a2 2 0 0 1 2 1.85v6.54a2 2 0 0 1-.97 1.7l-.14.08-9.67 4.84a2 2 0 0 1-1.61.07l-.17-.07-9.67-4.84a2 2 0 0 1-1.1-1.62V2.33a2 2 0 0 1 1.84-2h.15zm0 2H6.33v6.39L16 13.55l9.67-4.83z"></path>
              </svg>
              <div className="space-y-4">
                <p className="font-bold text-lg max-sm:text-base">
                  Chủ nhà siêu cấp
                </p>
                <p className="text-gray-500 text-lg max-sm:text-base">
                  Chủ nhà siêu cấp là những Chủ nhà dày dạn kinh nghiệm, được
                  đánh giá cao.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                strokeWidth={3}
                className="h-9 w-9 max-sm:w-7 max-sm:h-7"
              >
                <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
              </svg>
              <div className="space-y-4">
                <p className="font-bold text-lg max-sm:text-base">
                  Địa điểm tuyệt vời
                </p>
                <p className="text-gray-500 text-lg max-sm:text-base">
                  92% khách gần đây đã xếp hạng 5 sao cho vị trí này.
                </p>
              </div>
            </div>
          </section>
          <hr />
          {/* cover */}
          <section className="py-5 space-y-3">
            <div className="text-2xl max-sm:text-lg font-bold ">
              <span className="text-mainColor">Air</span>
              <span className="text-black">Cover</span>
            </div>
            <p className="text-lg max-sm:text-base">
              Mọi thông tin của phòng đều sẽ được bảo vệ miễn phí, Trường hợp
              nếu thông tin chủ phòng không chính xác thì hãy nhanh chóng liên
              hệ với chúng tôi, để có thể giải quyết sớm nhất
            </p>
            <p className="font-bold underline text-lg max-sm:text-base cursor-pointer">
              Tìm hiểu thêm
            </p>
          </section>
          <hr />
          {/* Introdcue */}
          <section className="py-5 space-y-3">
            <h3 className="text-2xl max-sm:text-lg font-bold">
              Giới thiệu về chỗ này
            </h3>
            <div>
              <p className="text-lg max-sm:text-base">{detailRoom?.moTa}</p>
            </div>
          </section>
          <hr />
          <section className="py-5 space-y-3">
            <h3 className="text-2xl max-sm:text-lg font-bold">
              Nơi bạn sẽ ngủ nghỉ
            </h3>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
              <div className="h-full">
                <img
                  className="rounded-xl object-cover h-[300px]"
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNTQ0NTEyMzEwMTI3NDg1MQ%3D%3D/original/bd73f0f8-9057-4bbc-ad70-1db13eb5c03f.png?im_w=1440&im_q=highq"
                  alt=""
                />
                <div className="mt-3 text-lg max-sm:text-base">
                  <h4 className="font-bold text-xl max-sm:text-base">
                    Phòng ngủ
                  </h4>
                  <p>1 giường ngủ king</p>
                </div>
              </div>
              <div className="h-full">
                <img
                  className="rounded-xl object-cover h-[300px]"
                  src="https://a0.muscache.com/im/pictures/77c1f77d-fb4a-425d-8ef1-33d4bdcba8d1.jpg?im_w=720"
                  alt=""
                />
                <div className="mt-3 text-lg max-sm:text-base">
                  <h4 className="font-bold">Phòng khách</h4>
                  <p>1 sofa giường</p>
                </div>
              </div>
            </div>
          </section>
          {/* products */}
          <section className="py-5 space-y-5">
            <h3 className="text-2xl max-sm:text-lg font-bold">
              Nơi này có những gì cho bạn
            </h3>
            <div className="grid-cols-2 grid gap-5">
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
                <span className="">Chỗ đỗ xe miễn phí tại nơi ở</span>
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
                <span>Không gian làm việc</span>
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
                <span>Điều hòa nhiệt độ</span>
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
                <span>Lối ra hồ bơi </span>
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
                <span>Máy giặt phí Đã thanh toán – Trong toà nhà</span>
              </p>
            </div>
            <button className="border rounded-lg hover:bg-black/5 cursor-pointer text-lg max-sm:text-base border-gray-500 p-3 flex items-center justify-center font-600">
              <h4>Hiển thị 66 tiện nghi</h4>
            </button>
          </section>
        </div>
        {/* paymentcheckout */}
        <Payment
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          detailRoom={detailRoom}
        />
        {/* comments */}
      </div>
      <section className="space-y-5 py-12 max-lg:py-5">
        <article className="flex font-bold text-xl max-sm:text-lg items-center space-x-3">
          <Star />
          <span>{pointStar}</span>
          <span className="font-bold">
            {Airbnbcomment.length} lượt đánh giá
          </span>
        </article>
        <div className="flex justify-between max-lg:hidden text-lg font-600 py-5">
          <div className="flex flex-col">
            <p>Xếp hạng tổng thể</p>
            <div className="mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <span className="text-sm">{i + 1}</span> <Bar />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-5 border-l justify-between border-gray-400 px-11">
            <div className="flex flex-col">
              <span className="font-600">Mức Độ sạch sẽ</span>
              <span className="text-xl font-600">{pointStar}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              strokeWidth={3}
              className="h-9 w-9 max-sm:w-7 max-sm:h-7"
              focusable="false"
            >
              <path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z"></path>
            </svg>
          </div>
          <div className="flex flex-col space-y-5 border-l border-gray-400 px-11 justify-between">
            <div className="flex flex-col">
              <span className="font-600">Độ chính xác</span>
              <span className="text-xl font-600">5</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="w-9 h-9"
            >
              <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z"></path>
            </svg>
          </div>
          <div className="flex flex-col space-y-5 border-l border-gray-400 px-11 justify-between">
            <div className="flex flex-col">
              <span className="font-600">Nhận phòng</span>
              <span className="text-xl font-600">4,8</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="w-9 h-9"
            >
              <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path>
            </svg>
          </div>
          <div className="flex flex-col space-y-5 border-l border-gray-400 px-11 justify-between">
            <div className="flex flex-col">
              <span className="font-600">Giao tiếp</span>
              <span className="text-xl font-600">4,9</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              stroke="black"
              role="presentation"
              focusable="false"
              strokeWidth={2}
              className="w-9 h-9"
            >
              <path
                fill="none"
                d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col border-l justify-between border-gray-400 px-11 space-y-5">
            <div className="flex flex-col">
              <span className="font-600">Vị trí</span>
              <span className="text-xl font-600">4,9</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="w-9 h-9"
            >
              <path d="M30.95 3.81a2 2 0 0 0-2.38-1.52l-7.58 1.69-10-2-8.42 1.87A1.99 1.99 0 0 0 1 5.8v21.95a1.96 1.96 0 0 0 .05.44 2 2 0 0 0 2.38 1.52l7.58-1.69 10 2 8.42-1.87A1.99 1.99 0 0 0 31 26.2V4.25a1.99 1.99 0 0 0-.05-.44zM12 4.22l8 1.6v21.96l-8-1.6zM3 27.75V5.8l-.22-.97.22.97 7-1.55V26.2zm26-1.55-7 1.55V5.8l7-1.55z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-between border-gray-400 px-11 border-l  space-y-5">
            <div className="flex flex-col">
              <span className="font-600">Giá trị</span>
              <span className="text-xl font-600">4,9</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="w-9 h-9"
            >
              <path d="M16.17 2a3 3 0 0 1 1.98.74l.14.14 11 11a3 3 0 0 1 .14 4.1l-.14.14L18.12 29.3a3 3 0 0 1-4.1.14l-.14-.14-11-11A3 3 0 0 1 2 16.37l-.01-.2V5a3 3 0 0 1 2.82-3h11.35zm0 2H5a1 1 0 0 0-1 .88v11.29a1 1 0 0 0 .2.61l.1.1 11 11a1 1 0 0 0 1.31.08l.1-.08L27.88 16.7a1 1 0 0 0 .08-1.32l-.08-.1-11-11a1 1 0 0 0-.58-.28L16.17 4zM9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
            </svg>
          </div>
        </div>
      </section>

      <section ref={commentRef}>
        <Comments />
      </section>
    </main>
  );
};
export default AirBnbDetail;
