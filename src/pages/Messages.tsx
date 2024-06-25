const Messages = () => {
  return (
    <div className="w-[95%] max-sm:w-[90%] mx-auto space-y-5 py-12">
      <article className="flex items-center space-x-3">
        <h3 className="text-2xl max-sm:text-lg font-bold">
          Thông báo tin nhắn
        </h3>
      </article>
      <hr />
      <p className="text-xl max-sm:text-lg font-bold">
        Chưa có một thông báo tin nhắn nào
      </p>
      <p className="text-xl max-sm:text-base">
        Khi bạn có một thông báo hay trải nghiệm tin nhắn từ người tổ chức hay
        người chủ sẽ hiện lên ở đây
      </p>
      <button className="border-black max-sm:text-base hover:bg-black/5 rounded hover font-500 text-lg p-3 border">
        Khám phá Airbnb
      </button>

      <hr />
      <p className="text-lg max-sm:text-sm ">
        Bạn không tìm thấy danh sách yêu thích của mình ở đây?
        <span className="underline font-600">Truy cập Trung tâm trợ giúp</span>
      </p>
    </div>
  );
};

export default Messages;
