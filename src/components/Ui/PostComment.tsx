import { useState } from "react";
import Star from "./icon/Star";
import { RootState, useAppDispath } from "store";
import moment from "moment";
import { useSelector } from "react-redux";
import { getAirbnbCommentThunk } from "store/quanLycomment/thunk";
import { toast } from "react-toastify";
const PostComment = ({
  maPhong,
  createComment,
}: {
  maPhong: string;
  createComment: any;
}) => {
  const dispatch = useAppDispath();
  const { ThongTinUser } = useSelector(
    (state: RootState) => state.LayThongTinTinReducer
  );
  const [noiDung, setNoiDung] = useState<string>();
  const [saoBinhLuan, setStar] = useState<number>(3);
  const handelStar = () => {
    return Array.from(Array(5).keys()).map((i) => {
      return (
        <span key={i} onClick={() => setStar(i + 1)} className="cursor-pointer">
          <Star
            fill={i + 1 <= saoBinhLuan ? "black" : "none"}
            className="text-white"
          />
        </span>
      );
    });
  };
  const comment = {
    maPhong,
    maNguoiBinhLuan: ThongTinUser?.id,
    ngayBinhLuan: moment(new Date()).toISOString(),
    noiDung,
    saoBinhLuan,
  };
  const handelPostComment = async () => {
    !ThongTinUser
      ? toast.error("Bạn cần phải đăng nhập trước")
      : await createComment(comment);
    setNoiDung("");
    dispatch(getAirbnbCommentThunk(maPhong));
  };
  return (
    <section className="py-5">
      <div className="rating py-5 space-x-2">{handelStar()}</div>
      <section>
        <textarea
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
          className="w-full resize-none border  border-gray-500 outline-none p-3 min-h-[150px] rounded-xl"
        ></textarea>
        <button
          onClick={handelPostComment}
          disabled={!noiDung}
          className={`font-600 bg-black text-white rounded p-3 mt-3  ${
            !noiDung ? "cursor-no-drop bg-gray-300" : ""
          }`}
        >
          Thêm bình luận
        </button>
      </section>
    </section>
  );
};

export default PostComment;
