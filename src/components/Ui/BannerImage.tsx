import LogoIcon from "./icon/LogoIcon";

const BannerImage = () => {
  return (
    <section className="relative">
      <img
        className="h-[600px] w-full rounded-lg object-cover"
        src="https://news.airbnb.com/wp-content/uploads/sites/4/2020/04/Airbnb_Peru_Skylodge.jpg"
        alt=""
      />
      <div className="absolute h-full w-1/2 top-1/3 space-y-7 left-7">
        <LogoIcon />
        <p className="text-white text-2xl font-600">
          Đăng ký để trở thành chủ nhà <br /> trải nghiệm nhiều điều mới nhất
        </p>
        <button className="text-white bg-mainColor font-600 p-3 rounded-lg">
          Trở thành chủ nhà
        </button>
      </div>
    </section>
  );
};

export default BannerImage;
