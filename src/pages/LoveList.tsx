const LoveList = () => {
  return (
    <div className="w-[95%] max-sm:w-[90%] mx-auto space-y-5 py-12">
      <article className="flex items-center space-x-3">
        <h3 className="text-2xl max-sm:text-lg font-bold">
          Danh sách Yêu thích
        </h3>
      </article>
      <hr />
      <p className="text-xl max-sm:text-lg font-bold">
        Bạn chưa có địa điểm hay chuyến du lịch ưa thích
      </p>
      <p className="text-xl font-500 max-sm:text-base">
        Khi bạn thích một chuyến đi hay trải nghiệm tin nhắn từ người tổ chức
        hay người chủ sẽ hiện lên ở đây
      </p>
      <button className="border-black max-sm:text-base hover:bg-black/5 rounded hover font-500 text-lg p-3 border">
        Khám phá Airbnb
      </button>

      <hr />
      <p className="text-lg max-sm:text-sm font-500">
        Bạn không tìm thấy danh sách yêu thích của mình ở đây?
        <span className="underline font-600">Truy cập Trung tâm trợ giúp</span>
      </p>
    </div>
  );
};

export default LoveList;
