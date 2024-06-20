import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "store";
import { getAirbnbCommentThunk } from "store/quanLycomment/thunk";
import Star from "./icon/Star";
import moment from "moment";
import UserIcon from "./icon/UserIcon";
import { myCustomDataType } from "types/QuanlyComment";
import PostComment from "./PostComment";
import { deleteCommentThunk } from "store/deleteComment/thunk";
import { postCommentThunk } from "store/postComment/thunk";
import { useParams } from "react-router-dom";
const Comments = () => {
  // states
  const { id } = useParams();
  const dispatch = useAppDispath();
  const [commentStatus, setCommentStatus] = useState({});
  const { Airbnbcomment } = useSelector(
    (state: RootState) => state.quanlyairbnbComment
  );
  const toggleComment = (id) => {
    setCommentStatus({
      ...commentStatus,
      [id]: !commentStatus[id],
    });
  };
  // logic
  const handelText = (comment: string, id) => {
    return comment.length > 200 ? (
      <div>
        {!commentStatus[id] ? (
          <section>
            <span className="font500">{comment.slice(0, 150)}</span>
            <p
              onClick={() => toggleComment(id)}
              className="font-bold underline cursor-pointer"
            >
              Hiển thị thêm
            </p>
          </section>
        ) : (
          <section>
            <span className="font-500">{comment.slice(0, comment.length)}</span>
            <p
              className="font-bold underline cursor-pointer"
              onClick={() => toggleComment(id)}
            >
              Thu gọn
            </p>
          </section>
        )}
      </div>
    ) : (
      comment
    );
  };
  const handelAvatar = (comment: myCustomDataType) => {
    return comment.avatar ? (
      <img
        className="h-16 w-16 object-cover rounded-full"
        src={comment?.avatar}
        alt=""
      />
    ) : (
      <UserIcon />
    );
  };
  const handelStar = (comment: myCustomDataType) => {
    return Array.from(
      Array(comment.saoBinhLuan ? comment.saoBinhLuan : 5).keys()
    ).map((i) => <Star key={i} className="!h-3 !w-3" />);
  };
  const createComment = async (comment: myCustomDataType) =>
    dispatch(postCommentThunk(comment));
  //  mount
  useEffect(() => {
    dispatch(getAirbnbCommentThunk(id));
  }, [dispatch]);
  return (
    <section className="py-12 ">
      <section className="grid gap-11 py-5 text-base grid-cols-2">
        {Airbnbcomment?.map((comment, index) => {
          return (
            <section key={index} className="flex justify-between items-center">
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-3">
                  {handelAvatar(comment)}
                  <div>
                    <p className="font-semibold text-lg">
                      {comment.tenNguoiBinhLuan}
                    </p>
                    <p>Việt nam</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">{handelStar(comment)}</div>
                  <span className="font-semibold">
                    {moment(comment.ngayBinhLuan).toISOString()
                      ? moment(comment.ngayBinhLuan).format("DD/MM/yyyy")
                      : comment.ngayBinhLuan}
                  </span>
                </div>
                <div>
                  <div className="text-lg w-[80%]">
                    {handelText(comment.noiDung, comment.id)}
                  </div>
                </div>
              </div>
              <div className="action space-x-3 flex items-center">
                <button
                  onClick={async () => {
                    await dispatch(deleteCommentThunk(comment.id));
                    dispatch(getAirbnbCommentThunk(id));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
              </div>
            </section>
          );
        })}
      </section>
      <PostComment maPhong={id} createComment={createComment} />
      {/* {Airbnbcomment.length > 6 && (
        <section className="py-5">
          {seeMoreComment > 6 ? (
            <button
              onClick={() => setSemmoreComment(6)}
              className="border hover:bg-black/5 border-gray-500 px-5 py-3 rounded-xl font-bold"
            >
              <span>Thu gọn</span>
            </button>
          ) : (
            <button
              onClick={() => setSemmoreComment(Airbnbcomment?.length)}
              className="border hover:bg-black/5 border-gray-500 p-5 rounded-xl font-600"
            >
              <span>Hiển thị thêm {Airbnbcomment?.length} đánh giá</span>
            </button>
          )}
        </section>
      )} */}
    </section>
  );
};

export default Comments;
