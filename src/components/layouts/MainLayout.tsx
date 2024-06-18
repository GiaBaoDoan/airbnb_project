import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styled from "styled-components";
const MainLayOut = () => {
  return (
    <CssContainer className="font-my-font">
      <Header />
      <Outlet />
      <Footer />
    </CssContainer>
  );
};
const CssContainer = styled.div`
  .swiper-button-next,
  .swiper-button-prev {
    /* border: 1px solid black; */
    border-radius: 100%;
    width: 30px;
    background-color: white;
    height: 30px;
    color: black;
  }
  .swiper-pagination-bullet-active {
    background-color: white;
    opacity: 1 !important;
  }
  .swiper-pagination-bullet {
    background-color: white;
    opacity: 0.5;
  }
  .swiper-button-next:after,
  .swiper-rtl .swiper-button-prev:after {
    font-size: 12px;
    font-weight: 800;
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  .swiper-button-prev:after,
  .swiper-rtl .swiper-button-prev:after {
    font-size: 12px;
    font-weight: 900;
  }
`;
export default MainLayOut;
