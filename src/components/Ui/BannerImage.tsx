import data from "../../JSON/ImageBanner.json";
const BannerImage = () => {
  return (
    <section className="w-[95%] mx-auto">
      <h3 className="font-bold text-2xl py-5">Các chuyến du lịch</h3>
      <div className="grid grid-cols-3 gap-5">
        {data.map((item, index) => {
          return (
            <img
              src={item}
              className={`rounded-xl w-full h-[400px] hover:bg-black-100 object-cover ${
                index === 0 ? "col-span-2" : ""
              }`}
              alt=""
            />
          );
        })}
      </div>
    </section>
  );
};

export default BannerImage;
