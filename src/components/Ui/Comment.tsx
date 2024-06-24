import { useEffect, useRef, useState } from "react";
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
import EditComment from "./EditComment";
const Comments = () => {
  // states
  const { id } = useParams();
  const dispatch = useAppDispath();
  const [commentStatus, setCommentStatus] = useState({});
  const { Airbnbcomment } = useSelector(
    (state: RootState) => state.quanlyairbnbComment
  );
  const commentRef = useRef<HTMLElement | null>(null);
  const [editComment, setEditComment] = useState<any>(null);
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
            <span className="font-500">{comment.slice(0, 150)}</span>
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
      <p className="font-500">{comment}</p>
    );
  };
  const handelAvatar = (comment: myCustomDataType) => {
    return comment.avatar ? (
      <img
        className="h-16 w-16 max-md:w-11 max-md:h-11 object-cover rounded-full"
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
  }, [id]);
  return (
    <section className="py-12 max-lg:py-0">
      <section className="grid gap-11 py-5 text-base grid-cols-2 max-lg:grid-cols-1">
        {Airbnbcomment?.map((comment, index) => {
          return (
            <section key={index} className="flex justify-between items-center">
              <div className="space-y-3 flex-1">
                <div className="flex items-center">
                  <div className="flex-1 space-x-3 flex items-center">
                    {handelAvatar(comment)}
                    <div>
                      <p className="font-semibold text-lg max-sm:text-base">
                        {comment.tenNguoiBinhLuan}
                      </p>
                      <p>Việt nam</p>
                    </div>
                  </div>
                  <div className="action lg:hidden space-x-3 flex items-center">
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
                    <button
                      onClick={() => {
                        setEditComment(comment);
                        commentRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
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
                        className="lucide lucide-pencil"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </button>
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
                  <div className="text-lg max-sm:text-base w-[80%] max-lg:w-full">
                    {handelText(comment.noiDung, comment.id)}
                  </div>
                </div>
              </div>
              <div className="action max-lg:hidden space-x-3 flex items-center">
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
                <button onClick={() => setEditComment(comment)}>
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
      {editComment ? (
        <section ref={commentRef}>
          <EditComment
            setEditComment={setEditComment}
            maPhong={id}
            oldComment={editComment}
          />
        </section>
      ) : (
        <PostComment maPhong={id} createComment={createComment} />
      )}
    </section>
  );
};

export default Comments;
