import styled from "styled-components";
import Heart from "./icon/Heart";
import SearchIcon from "./icon/SearchIcon";
import { useNavigate } from "react-router-dom";

const NavBottom = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <CssConatiner>
      <main className="lg:hidden z-10 fixed w-full p-5 max-sm:p-3 border bg-gray-100 bottom-0 right-0">
        <section className="flex justify-between">
          <div
            onClick={() => navigate("/")}
            className="flex flex-col par active items-center space-y-4"
          >
            <SearchIcon
              strokeWidth={2}
              stroke="black"
              className="!w-7 !h-7 icon max-sm:!w-5 max-sm:!h-5"
            />
            <span className="text-nav max-sm:text-xs">Khám phá</span>
          </div>
          <div
            onClick={() => navigate("/my-trip")}
            className="flex flex-col par items-center space-y-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="w-7 h-7 icon max-sm:!w-5 max-sm:!h-5"
              strokeWidth="2"
              stroke="black"
            >
              <g fill="none">
                <path d="M16.67 24.94c-2.35 3.15-4.7 4.73-7.07 4.73-3.62 0-5.17-2.38-5.53-4.21-.32-1.63.5-3.82.8-4.54l1.75-3.85A205.3 205.3 0 0 1 11.7 6.6L12.6 5l.23-.41c.4-.68 1.5-2.25 3.84-2.25a4.16 4.16 0 0 1 3.78 2.16l.29.5.76 1.37.4.73c1.22 2.3 2.75 5.52 4.02 8.25l2.51 5.5c.27.61 1.16 2.92.83 4.62-.36 1.83-1.9 4.2-5.53 4.2-2.42 0-4.77-1.57-7.06-4.72z"></path>
                <path d="M16.67 24.94c2.1-2.8 3.34-5.09 3.7-6.84.52-2.63-1.06-4.83-3.7-4.83s-4.23 2.2-3.7 4.83c.35 1.75 1.59 4.03 3.7 6.84z"></path>
              </g>
            </svg>
            <span className="text-nav max-sm:text-xs">Chuyến đi</span>
          </div>
          <div
            onClick={() => navigate("/love-list")}
            className="flex flex-col par items-center space-y-4"
          >
            <Heart
              stroke="black"
              fill="none"
              className="!w-7 !h-7 icon max-sm:!w-5 max-sm:!h-5"
            />
            <span className="text-nav max-sm:text-xs">Yêu thích</span>
          </div>
          <div
            onClick={() => navigate("/messages")}
            className="flex flex-col par items-center space-y-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              stroke="black"
              className="w-7 h-7 icon max-sm:w-5 max-sm:h-5"
              strokeWidth={2}
            >
              <path
                fill="none"
                d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
              ></path>
            </svg>
            <span className="text-nav max-sm:text-xs">Tin nhắn</span>
          </div>
          {token && (
            <div
              onClick={() => navigate("/account")}
              className="flex flex-col par items-center space-y-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                stroke="black"
                className="w-7 h-7 icon max-sm:w-5 max-sm:h-5"
                strokeWidth={2}
              >
                <g fill="none">
                  <circle cx="16" cy="16" r="14"></circle>
                  <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62"></path>
                </g>
              </svg>
              <span className="text-nav max-sm:text-xs">Hồ sơ</span>
            </div>
          )}
          {!token && (
            <div
              onClick={() => navigate("/login")}
              className="flex flex-col par items-center space-y-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                stroke="black"
                className="w-7 h-7 icon max-sm:w-5 max-sm:h-5"
                strokeWidth={2}
              >
                <g fill="none">
                  <circle cx="16" cy="16" r="14"></circle>
                  <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62"></path>
                </g>
              </svg>
              <span className="text-nav max-sm:text-xs">Đăng nhập</span>
            </div>
          )}
        </section>
      </main>
    </CssConatiner>
  );
};
const CssConatiner = styled.div`
  .active {
    color: rgb(216 45 139);
    .icon {
      stroke: rgb(216 45 139);
    }
  }
  .par {
    cursor: pointer;

    &:hover {
      .text-nav {
        color: rgb(216 45 139);
      }
      .icon {
        stroke: rgb(216 45 139);
      }
    }
  }
`;
export default NavBottom;
