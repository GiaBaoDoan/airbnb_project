// import { UserOutlined } from "@ant-design/icons";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Avatar, Rate, Space } from "antd";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { RootState, useAppDispath } from "store";
// import { z } from "zod";
// import {
//   getAirbnbCommentThunk,
//   postCommentThunk,
// } from "store/quanLycomment/thunk";
// import { toast } from "react-toastify";

// const AirbnbComment = () => {
//   // comment
//   const dispatch = useAppDispath();
//   const { Airbnbcomment } = useSelector(
//     (state: RootState) => state.quanlyairbnbComment
//   );
//   const { isCommenting } = useSelector(
//     (state: RootState) => state.postCommentReducer
//   );
//   const { ThongTinUser } = useSelector(
//     (state: RootState) => state.LayThongTinTinReducer
//   );
//   console.log(ThongTinUser);
//   const [isDisable, setIsDisbale] = useState<boolean>(false);
//   const { register, setValue, handleSubmit, reset } = useForm({
//     mode: "onChange",
//     resolver: zodResolver(z.object({ noiDung: z.string().nonempty() })),
//   });
//   useEffect(() => {
//     if (!(document.getElementById("noiDung") as HTMLTextAreaElement).value) {
//       setIsDisbale(true);
//     }
//   }, []);
//   const onSubmit = (data) => {
//     if (localStorage.getItem("token")) {
//       dispatch(postCommentThunk(data))
//         .unwrap()
//         .then(async () => {
//           await dispatch(getAirbnbCommentThunk());
//           reset({
//             noiDung: "",
//             saoBinhLuan: 0,
//           });
//           setIsDisbale(true);
//         })
//         .catch();
//     } else {
//       toast.error("Bạn cần đăng nhập để có thể bình luận");
//     }
//   };

//   // show tối đa 6 bình luận
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const maxReviewsToShow = 6;

//   const toggleShowReviews = () => {
//     setShowAllReviews(!showAllReviews);
//   };
//   const handelTextErea = (e) => {
//     const { value } = e.target;
//     if (!value) {
//       setIsDisbale(true);
//     } else {
//       setIsDisbale(false);
//     }
//   };
//   const handelRating = (value) => {
//     setValue("saoBinhLuan", value);
//   };

//   return (
//     <>
//       <div className="">
//         {/* header bình luận */}
//         <div className="flex ">
//           <p className="mb-5 text-xl mr-10">Review </p>

//           <div className="flex mb-5 text-lg  ">
//             <img
//               className="h-7 mr-2 flex "
//               src="https://i.ibb.co/M9RS4ky/3d-star.png"
//               alt=".../"
//             />

//             <p className="mr-5"> 4.85 </p>
//             <img
//               className="h-7 mr-2 flex "
//               src="https://i.ibb.co/zrYSH71/comments.png"
//               alt=".../"
//             />

//             <p> 151 reviews</p>
//           </div>
//         </div>

//         {/* nội dung bình luận */}
//         <div className="mt-5 grid grid-cols-2 overflow-auto max-h-[600px] max-ipad:grid-cols-1">
//           {/* comment */}
//           {Airbnbcomment?.slice(
//             0,
//             showAllReviews ? Airbnbcomment.length : maxReviewsToShow
//           )?.map((comment) => (
//             <div>
//               <div className="">
//                 <div className="mr-20 mb-5 p-5 max-ip678Plus:px-0 ">
//                   <div className="flex items-center">
//                     <Space direction="vertical" size={16}>
//                       <Space>
//                         <Avatar size={40} icon={<UserOutlined />} />
//                       </Space>
//                     </Space>
//                     <div className="ml-5">
//                       <Rate defaultValue={comment?.saoBinhLuan} />
//                       <p className="text-gray-600">{comment?.noiDung}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* button show comment */}
//         <button
//           className="border-2 border-gray-500 rounded-lg py-3 px-7 hover:bg-mainColor hover:border-mainColor duration-200 hover:text-white"
//           onClick={toggleShowReviews}
//         >
//           {showAllReviews ? "Hide reviews" : " Show all reviews"}
//         </button>

//         {/* viết bình luận & sao bình luận */}
//         <div className="my-[20px]">
//           <div className="flex items-center ">
//             {localStorage.getItem("token") ? (
//               <span className="ml-[10px] bg-[gray] p-[10px] w-[50px] h-[50px] text-white  flex items-center justify-center  rounded-[50%]">
//                 {ThongTinUser?.name.substring(0, 1)}
//               </span>
//             ) : (
//               ""
//             )}
//           </div>
//           <div className="my-[20px] ">
//             <div className="flex items-center space-x-2 ">
//               <div className="mb-[10px]">
//                 <Rate onChange={handelRating} />
//               </div>
//             </div>
//             <textarea
//               {...register("noiDung")}
//               onChange={handelTextErea}
//               name="noiDung"
//               id="noiDung"
//               rows={5}
//               className="w-full  border border-gray outline-none rounded-[5px] p-[10px]"
//             ></textarea>

//             <button
//               disabled={isDisable ? true : false}
//               onClick={handleSubmit(onSubmit)}
//               className={`bg-mainColor  ${
//                 isDisable ? "bg-slate-400 hover:none" : ""
//               }  space-x-2 p-[10px] hover:translate-y-[-20%] px-[30px] transition-all duration-300  text-white rounded-[5px] hover: mt-[20px]`}
//             >
//               {isCommenting ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   className="lucide lucide-rotate-ccw"
//                 >
//                   <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
//                   <path d="M3 3v5h5" />
//                 </svg>
//               ) : (
//                 <div className="flex items-center space-x-2">
//                   <span>Send</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     stroke-width="2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     className="lucide lucide-send-horizontal"
//                   >
//                     <path d="m3 3 3 9-3 9 19-9Z" />
//                     <path d="M6 12h16" />
//                   </svg>
//                 </div>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AirbnbComment;
