import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import FsLightbox from "fslightbox-react";
import data from "../JSON/index.json";
const Carousel = ({ children: slides, index }) => {
  const [curr, setCurr] = useState<number>(0);
  const [IN, setIn] = useState<number>();
  const prev = () => {
    setCurr((curr) => (curr == 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr == slides.length - 1 ? 0 : curr + 1));
  };
  const [toggler, setToggler] = useState(false);
  const sources = data.rowThree[IN]?.map((item) => {
    return item.img;
  });

  const handleButtonClick = () => {
    setToggler(!toggler);
    setIn(index);
  };

  return (
    <CarouselCSS>
      <div
        className="card  relative rounded-[20px]"
        style={{ boxShadow: "0 0 10px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="overlay duration-300"></div>
        <div
          className="flex transition-transform rounded-[20px] w-[500px] h-[400px] ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
        <button className="absolute top-[20px]  heart  left-5 cursor-pointer">
          <Heart
            size={30}
            className="text-[black]"
            strokeWidth={"2px"}
            fill="red"
          />
        </button>
        <button
          onClick={handleButtonClick}
          className="absolute top-[20px] right-[10px] view cursor-pointer"
        >
          <span>Veiw</span>
        </button>
        <div className="absolute inset-0 z-[11] flex items-center justify-between px-10">
          <button
            onClick={prev}
            className="shadow  rounded-full bg-gray-100 text-gray-800 hover:bg-white"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            onClick={next}
            className="shadow rounded-full bg-gray-100 text-gray-800 hover:bg-white"
          >
            <ChevronRight size={30} />
          </button>
        </div>
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex justify-center items-center gap-[5px]">
            {slides.map((_, i) => {
              return (
                <div
                  className={`transition-all w-[10px] h-[10px] bg-white rounded-full ${
                    curr == i ? "p-[8px] " : "bg-opacity-50"
                  } `}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <FsLightbox
        className="relative !ml-[300px] z-50"
        toggler={toggler}
        sources={sources}
        customStyles={{
          zIndex: 1000, // Giá trị z-index bạn muốn áp dụng
        }}
        types={["image", "image", "image", "image"]}
      />
    </CarouselCSS>
  );
};
const CarouselCSS = styled.div`
  .card {
    &:before {
      content: "";
      width: 50%;
      height: 100%;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: -100%;
      display: block;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 100%
      );
      transform: skewX(-25deg);
      transition: all 0.75s;
      z-index: 10;
    }
    &:hover {
      &::before {
        left: 125%;
      }
      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 10;
      }
      .view {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
    .view {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 18px;
      color: #fff;
      width: 50px;
      font-weight: 600;
      z-index: 15;
      height: 50px;
      line-height: 50px;
      background: linear-gradient(
        to right,
        #f55f8d 0,
        #f8ae56 51%,
        #f55f8d 100%
      );
      background-position: 0 0;
      opacity: 0;
      background-size: 200%;
      border-radius: 10px;
      transform: translate(20px, -20px);
      transition: all 0.5s;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 10px 5px rgba(255, 204, 0, 0.669);
      }
    }
  }
`;
export default Carousel;
