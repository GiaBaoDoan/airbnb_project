import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Heart from "./icon/Heart";
import { useNavigate } from "react-router-dom";
import { ListRooms } from "types/QuanLyPhong";
const CardTravel = ({ room, images }: { room: ListRooms; images: any }) => {
  const navigate = useNavigate();
  return (
    <section className="relative">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper cursor-pointer rounded-xl overflow-hidden"
      >
        {images?.map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                onClick={() => navigate(`/detail/${room.id}`)}
                className="h-[264px] w-full object-cover"
                src={images[index]}
                alt="../"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {room.id >= 5 && room.id <= 12 && (
        <div className="absolute top-3 text-black font-600 shadow-lg bg-white py-4 px-5 rounded-full z-10  left-3">
          <p>Được khách yêu thích</p>
        </div>
      )}
      <Heart className="absolute z-10 cursor-pointer hover:scale-110 transition-all !top-3 right-3" />
    </section>
  );
};
export default CardTravel;
