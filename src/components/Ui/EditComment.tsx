import { useEffect, useState } from "react";
import Star from "./icon/Star";
import { RootState, useAppDispath } from "store";
import moment from "moment";
import { useSelector } from "react-redux";
import { UpdateComentThunk } from "store/update-comment/thunk";
import { getAirbnbCommentThunk } from "store/quanLycomment/thunk";
const EditComent = ({
  maPhong,
  oldComment,
  setEditComment,
}: {
  maPhong: string;
  oldComment: any;
  setEditComment: (comment: any) => void;
}) => {
  const dispatch = useAppDispath();
  const { ThongTinUser } = useSelector(
    (state: RootState) => state.LayThongTinTinReducer
  );
  const [noiDung, setNoiDung] = useState<string>(oldComment.noiDung);
  const [saoBinhLuan, setStar] = useState<number>(oldComment.saoBinhLuan);
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
    id: oldComment?.id,
    maPhong,
    maNguoiBinhLuan: ThongTinUser?.id,
    ngayBinhLuan: moment(new Date()).toISOString(),
    noiDung,
    saoBinhLuan,
  };
  const handelPutComment = async () => {
    await dispatch(UpdateComentThunk(comment));
    dispatch(getAirbnbCommentThunk(maPhong));
    setEditComment(null);
  };
  useEffect(() => {
    setNoiDung(oldComment.noiDung);
    setStar(oldComment.saoBinhLuan);
  }, [oldComment]);
  return (
    <section className="py-5">
      <div className="rating py-5 space-x-2">{handelStar()}</div>
      <section>
        <textarea
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
          className="w-full resize-none border  border-gray-500 outline-none p-3 min-h-[150px] rounded-xl"
        ></textarea>
        <div className="space-x-5">
          <button
            onClick={handelPutComment}
            disabled={!noiDung}
            className={`font-600 bg-black text-white rounded p-3 mt-3  ${
              !noiDung ? "cursor-no-drop bg-gray-300" : ""
            }`}
          >
            Cập nhật bình luận
          </button>
          <button
            onClick={() => setEditComment(null)}
            className="bg-black/5 w-11 hover:bg-black/10 h-11 rounded-full"
          >
            X
          </button>
        </div>
      </section>
    </section>
  );
};

export default EditComent;
