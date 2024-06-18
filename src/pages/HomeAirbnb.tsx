import "animate.css";
import ExploreNearBy from "components/Ui/ExploreNearBy";
import LoadingPage from "components/Ui/LoadingPage";
import ModelRoom from "components/Ui/ModelRoom";
import { useEffect } from "react";
import data from "../JSON/Experience.json";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "store";
import { getAirbnbListThunk } from "store/quanLyAirbnb/thunk";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { max, min } from "store/filterPrice/slice";
export const HomeAirbnb = () => {
  const dispatch = useAppDispath();
  // const { ThongTinUser } = useSelector(
  //   (state: RootState) => state.LayThongTinTinReducer
  // );
  const { AirbnbList, isFetchingAirbnb } = useSelector(
    (state: RootState) => state.quanLyAirbnb
  );
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.fitlerReducer
  );
  const sortRoom = AirbnbList.slice(0, 22)?.filter((item) =>
    (minPrice || maxPrice) !== null
      ? item.giaTien >= minPrice && item.giaTien <= maxPrice
      : item
  );
  useEffect(() => {
    dispatch(getAirbnbListThunk());
    dispatch(min(null));
    dispatch(max(null));
  }, []);
  if (isFetchingAirbnb) return <LoadingPage />;
  return (
    <section className="pb-12">
      {/* <BannerImage /> */}
      <div className="max-w-[95%] mx-auto rounded-xl">
        <article className="flex my-5 justify-between items-center">
          <h2 className="text-2xl font-bold">
            AirBnb cung cấp trải nghiệm tốt nhất
          </h2>
        </article>
        <ModelRoom modelRooms={sortRoom} />
        <ExploreNearBy />
        {/*  */}
        <section className="py-5">
          <h3 className="font-bold text-2xl py-5">Sống ở bất kỳ đâu</h3>
          <div className="grid grid-cols-4 gap-5">
            <img
              src="https://a0.muscache.com/im/pictures/1e16f2f4-1256-44cb-a0f2-85aa57672a45.jpg?im_w=720"
              className="rounded-xl h-full"
              alt=""
            />
            <img
              src="https://a0.muscache.com/im/pictures/6721fc25-afe0-4f35-b181-212ec8ddc186.jpg?im_w=720"
              className="rounded-xl h-full"
              alt=""
            />
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-52439121/original/f8be2629-895f-4a3c-9e99-e63852b68a30.jpeg?im_w=720"
              className="rounded-xl h-full"
              alt=""
            />
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-1480354/original/5df5e5e8-5bc4-40a8-90cb-10fec3c42545.jpeg?im_w=720"
              className="rounded-xl h-full"
              alt=""
            />
          </div>
        </section>
        {/* setion */}
        {/* <section>
          <video src={video} className="h-[500px] rounded-xl" loop autoPlay>
            <p className="content">helo các bạn</p>
          </video>
        </section> */}
        <section className="py-5">
          <h3 className="text-2xl font-bold py-5 font-my-font">
            Trải nghiệm cá nhân
          </h3>
          <Swiper
            cssMode={true}
            navigation={true}
            slidesPerView={3}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesOffsetAfter={50}
            className="mySwiper cursor-pointer"
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <img
                      src={item.img}
                      className="rounded-xl w-[100%] object-cover h-[400px] "
                    />
                    <div className="absolute w-[50%] top-5 left-5 font-600 text-2xl text-white">
                      <p className="text-sm font-my-font font-medium">
                        Bộ siêu tập
                      </p>
                      <p>{item.title}</p>
                    </div>
                    <div className="absolute bottom-5 hover:bg-white/90 left-5 bg-white p-3 rounded-lg shadow-lg font-600">
                      <button>Hiển thị tất cả</button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      </div>
    </section>
  );
};
