import { useSelector } from "react-redux";
import { RootState } from "store";
import styled from "styled-components";
import data from "../JSON/index.json";
import "swiper/css";
import Carousel from "./Carousel";
import VisibilitySensor from "react-visibility-sensor";
import "animate.css";
import { useState } from "react";
const Posts = () => {
  const { value } = useSelector((state: RootState) => state.SetPixceReducer);
  const [hasAnimated, setHasAnimated] = useState(false);

  const onChangeVisibility = (visible) => {
    if (visible && !hasAnimated) {
      setHasAnimated(true);
    }
  };
  // const [toggler, setToggler] = useState(false);
  return (
    <CardCSS className="!bg-[rgba(0,0,0,0.08)] overflow-hidden">
      <main
        className={`px-[30px] w-[83%] transition-all ${
          value ? "ml-[220px]" : "ml-[320px]"
        }  py-[40px]`}
      >
        <h1 className="text-[40px]  font-500 text-[#3d5170]">Room Model </h1>
        <div className="grid grid-cols-3 my-[40px]  gap-[40px] ">
          {data?.rowThree.map((item, index) => {
            return (
              <Carousel key={index} index={index}>
                {item?.map((slide) => {
                  return <img src={slide.img} className="w-full" alt="" />;
                })}
              </Carousel>
            );
          })}
        </div>
        <h1 className="text-[40px]  font-500 text-[#3d5170]">
          Personal experience{" "}
        </h1>
        <div className="grid-cols-4 row-one mb-[40px] gap-[40px] grid ">
          {data?.rowOne?.map((item, key) => {
            return (
              <div
                style={{ animationDuration: `${1000 + key * 500}ms` }}
                className=" card animate__animated animate__fadeInDownBig"
              >
                <div
                  className="relative"
                  style={{
                    borderRadius: "5px 5px 0 0",
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    height: "300px",
                    backgroundImage: `url(${item.img})`,
                  }}
                >
                  <span
                    style={{ backgroundColor: `${item.bgColor}` }}
                    className={`absolute top-[20px] rounded-lg  text-[18px] right-[20px] text-white  font-medium mr-2 px-2.5 py-0.5  !bg-[${item.bgColor}]`}
                  >
                    {item?.titile}
                  </span>
                  <div
                    style={{
                      boxShadow:
                        "0 0 0 0.125rem #fff, 0 0.1875rem 0.4375rem rgba(90,97,105,.5)",
                    }}
                    className="absolute w-[60px]  ml-[20px]  h-[60px] translate-y-[50%] bottom-0 rounded-[50%] overflow-hidden"
                  >
                    <img
                      src={`${item?.avatar}`}
                      alt=""
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="p-[30px] mt-[20px]">
                  <a href="#">
                    <h5 className="mb-2 text-3xl tracking-tight font-600 text-[#3d5170] dark:text-white">
                      Conduct at an replied removal an amongst
                    </h5>
                  </a>
                  <p className="my-[20px] font-500 text-[#5a6169] text-2xl ">
                    However venture pursuit he am mr cordial. Forming musical am
                    hearing studied be luckily. But in for determine what would
                    see...
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 row-tow mb-[40px] gap-[40px]">
          {data?.rowTow?.map((item) => {
            return (
              <VisibilitySensor partialVisibility onChange={onChangeVisibility}>
                <div
                  className={`grid-cols-2 grid card   animate__animated ${
                    hasAnimated ? "animate__flipInX " : ""
                  } `}
                >
                  <div
                    className="mr-[20px] relative "
                    style={{
                      width: "90%",
                      height: "500px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundImage: `url(${item?.img})`,
                    }}
                  >
                    <span
                      style={{ backgroundColor: `${item.bgColor}` }}
                      className={`absolute left-[20px] rounded-lg text-[18px] top-[20px] text-white  font-medium mr-2 px-2.5 py-0.5  bg-[${item?.bgColor}]`}
                    >
                      {item?.titile}
                    </span>
                    <div
                      style={{
                        boxShadow:
                          "0 0 0 0.125rem #fff, 0 0.1875rem 0.4375rem rgba(90,97,105,.5)",
                      }}
                      className="absolute w-[60px] ml-[20px]  h-[60px] bottom-0 -translate-y-1/2 rounded-[50%] overflow-hidden"
                    >
                      <img
                        src={`${item?.avatar}`}
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-evenly mt-[35px] ">
                    <h5 className="mb-2 text-3xl font-500 tracking-tight text-[#3d5170]">
                      Attention he extremity unwilling on otherwise cars
                      backwards yet
                    </h5>
                    <p className="mb-3 font-500 text-[#5a6169] mt-[20px] text-[25px]">
                      Conviction up partiality as delightful is discovered. Yet
                      jennings resolved disposed exertion you off. Left did fond
                      drew fat head poor jet pan flying over...
                    </p>
                    <button className="inline-flex items-center px-3 py-2 w-[40%] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </VisibilitySensor>
            );
          })}
        </div>
      </main>
    </CardCSS>
  );
};
const CardCSS = styled.div`
  .card {
    box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    border: gray;
  }
  .row-one {
    /* animation-duration: 2s; */
  }
  .row-tow {
    position: relative;
    /* right: -100px; */
    opacity: 1;
    /* animation-name: slide-x; */
    animation-duration: 2s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    /* @keyframes slide-x {
      0% {
        right: -100px;
        opacity: 0;
      }
      100% {
        right: 0;
        opacity: 1;
      }
    } */
  }
`;
export default Posts;
