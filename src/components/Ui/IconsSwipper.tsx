import { Swiper, SwiperSlide } from "swiper/react";
import IconsData from "../../JSON/Logo.json";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
const IconsSwipper = () => {
  const [activeIcon, setActiveIcon] = useState(0);
  return (
    <div className="header-bottom sticky z-10 bg-white left-5">
      <Swiper
        navigation={true}
        slidesPerGroup={4}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={12}
      >
        <div>
          {IconsData.map((icon, index) => {
            return (
              <SwiperSlide
                onClick={() => setActiveIcon(index)}
                key={index}
                className={`transition-all border-b-[2px] pb-3 border-transparent font-medium hover:opacity-100 hover:border-gray-400  cursor-pointer ${
                  index === activeIcon ? "!border-black" : ""
                }`}
              >
                <div className="flex flex-col space-y-3 justify-center items-center">
                  <img src={icon.name} className="w-7 h-7" alt="" />
                  <span
                    className={`text-sm font-600 transition-all  ${
                      activeIcon === index ? "opacity-100" : "opacity-80"
                    } `}
                  >
                    {icon.icon}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};

export default IconsSwipper;
