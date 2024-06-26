import Icon from "components/Ui/icon/Icon";
import UserIcon from "components/Ui/icon/UserIcon";
import SearchUi from "components/Ui/SearchUi";
import LogoIcon from "components/Ui/icon/LogoIcon";
import IconsSwipper from "components/Ui/IconsSwipper";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { min, max, addFeature } from "store/filterPrice/slice";
import featureJson from "../../JSON/FeaturesInRoom.json";
import Filter from "components/Ui/icon/Filter";
import { RootState, useAppDispath } from "store";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SearchUiRps from "./SearchRps";
type Feature = {
  text: string;
  val: string;
};
export const Header = () => {
  const dispatch = useAppDispath();
  const { open } = useSelector((state: RootState) => state.searchReducer);
  const { avatar } = useSelector((state: RootState) => state.UploadAnhReducer);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>();
  const [minPrice, setMinprice] = useState<number>(20);
  const [maxPrice, setMaxPrice] = useState<number>(30);
  const [active, setActive] = useState<Feature[]>([]);
  const handelFilter = () => {
    dispatch(
      min(
        Number(maxPrice) > Number(minPrice)
          ? Number(minPrice)
          : Number(maxPrice)
      )
    );
    dispatch(
      max(
        Number(maxPrice) > Number(minPrice)
          ? Number(maxPrice)
          : Number(minPrice)
      )
    );
    dispatch(addFeature(active));
    modalRef?.current?.close();
  };
  const handelFeature = (item: Feature) => {
    const index = active.findIndex((x) => x.text === item.text);
    const newActive = [...active];
    if (index !== -1) {
      newActive.splice(index, 1);
    } else {
      newActive.push(item);
    }
    return setActive(newActive);
  };
  const handeLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    window.location.reload();
    toast.success("Đã đăng xuất");
  };
  const { ThongTinUser } = useSelector(
    (state: RootState) => state.LayThongTinTinReducer
  );
  return (
    <CssContainer className="sticky top-0 bg-white z-[12]">
      <header>
        <div className="border top-header shadow">
          <div
            className={`flex ${
              open ? "h-[200px]" : "h-[100px]"
            }  py-5 font-semibold items-center max-lg:!h-[100px] justify-between max-sm:space-x-3 transition-all mx-auto w-[95%]`}
          >
            <div className="max-sm:hidden">
              <LogoIcon />
            </div>
            <SearchUiRps />
            <SearchUi />
            <div
              onClick={() => modalRef?.current?.showModal()}
              className="border lg:hidden hover:bg-black/5 border-gray-400 p-3 flex cursor-pointer items-center rounded-lg"
            >
              <Filter />
              <span className="font-semibold"></span>
            </div>
            <div className="flex space-x-5 max-lg:hidden items-center">
              <div className="flex items-center max-2xl:hidden space-x-3">
                <h4>Cho thuê chỗ ở qua Airbnb</h4>
                <Icon className="cursor-pointer" />
              </div>
              <div className="dropdown dropdown-bottom  dropdown-end">
                <div tabIndex={1}>
                  <div className="flex items-center transition-all shadow hover:shadow-md cursor-pointer border justify-between space-x-3 rounded-full px-5 p-3">
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
                      className="lucide lucide-align-justify"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                    {!ThongTinUser || !ThongTinUser?.avatar ? (
                      <UserIcon />
                    ) : (
                      <img
                        className="w-7 h-7 object-cover rounded-full"
                        src={avatar ? avatar : ThongTinUser.avatar}
                      />
                    )}
                  </div>
                </div>
                {ThongTinUser ? (
                  <ul
                    tabIndex={1}
                    className="dropdown-content space-y-3 shadow-lg font-500 text-base z-[100] menu py-3 px-2 bg-white rounded-box w-[400px]"
                  >
                    <div>
                      <li>
                        <div>
                          <h3 className="font-600">
                            Trải nghiệm mùa hè cùng Airbnb 2024
                          </h3>
                          <span className="text-white bg-mainColor flex justify-center items-center font-600 rounded-xl">
                            Mới
                          </span>
                        </div>
                      </li>
                      <hr />
                    </div>
                    <div className="font-600">
                      <li>
                        <span onClick={() => navigate("/account")}>
                          Thông tin cá nhân
                        </span>
                      </li>
                      <li>
                        <span>Chuyến đi</span>
                      </li>
                    </div>
                    <hr />
                    <div>
                      <li>
                        <span>Trở thành chủ nhà</span>
                      </li>
                      <li>
                        <button onClick={handeLogout}>
                          <span>Đăng xuất</span>
                        </button>
                      </li>
                    </div>
                  </ul>
                ) : (
                  <ul
                    tabIndex={1}
                    className="dropdown-content space-y-3 shadow-lg border font-500 text-base z-[100] menu py-3 px-2 bg-white rounded-box w-[400px]"
                  >
                    <div>
                      <li onClick={() => navigate("/login")}>
                        <span className="font-700">Đăng nhập</span>
                      </li>
                      <li onClick={() => navigate("/register")}>
                        <span>Đăng ký</span>
                      </li>
                    </div>
                    <hr />
                    <div>
                      <li>
                        <span>Cho thuê chỗ ở qua Airbnb</span>
                      </li>
                      <li>
                        <span>Trung tâm hỗ trợ</span>
                      </li>
                    </div>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex shadow bg-white mx-auto pt-5 border-b space-x-3">
          <div className="w-[90%] max-xl:w-full">
            <IconsSwipper />
          </div>
          <div
            onClick={() => modalRef?.current?.showModal()}
            className="border max-xl:hidden hover:bg-black/5 border-gray-400 h-full flex cursor-pointer items-center space-x-3 p-3 rounded-xl"
          >
            <Filter />
            <span className="font-semibold">Bộ lọc</span>
          </div>
        </div>
        <dialog id="my_modal_3" ref={modalRef} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Bộ lọc</h3>
            <div className="my-5">
              <div className="text-lg max-sm:text-base">
                <div className="flex space-x-3">
                  <span>
                    Giá{" "}
                    {Number(maxPrice) < Number(minPrice)
                      ? " tối đa"
                      : " tối thiểu"}
                    :
                  </span>
                  <span className="font-600 flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-dollar-sign"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>{" "}
                    <span>{minPrice}</span>
                  </span>
                </div>
                <input
                  type="range"
                  value={minPrice}
                  min="10"
                  max="500"
                  onChange={(e) => setMinprice(Number(e.target.value))}
                  className="range range-xs range-black mt-5"
                />
              </div>
            </div>
            <div className="my-5">
              <div className="text-lg max-sm:text-base">
                <div className="flex items-center space-x-3">
                  <span>
                    Giá{" "}
                    {Number(maxPrice) < Number(minPrice)
                      ? "tối thiểu"
                      : "tối đa"}
                    :
                  </span>
                  <span className="font-600 flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-dollar-sign"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                    <span>{maxPrice}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  value={maxPrice}
                  max="500"
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="range range-black range-xs mt-5"
                />
              </div>
            </div>
            <hr />
            <div className="py-5 ">
              <span className="font-600 text-lg max-sm:text-base">
                Tính năng cho căn phòng
              </span>
              <div className="flex flex-wrap gap-5 mt-5">
                {featureJson?.map((item) => (
                  <button
                    key={item.val}
                    onClick={() => handelFeature(item)}
                    className={`flex sm:space-x-4 space-x-2  items-center ${
                      active.includes(item) ? "bg-black text-white" : "bg-white"
                    } border px-5 py-3 rounded-xl font-500 text-sm`}
                  >
                    <span>{item?.text}</span>

                    <span>
                      {active.includes(item) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={handelFilter}
                className="bg-black/100 px-7 max-sm:px-5 font-600 rounded-lg py-3 text-white"
              >
                Lọc
              </button>
              <button
                className="underline font-bold"
                onClick={() => {
                  dispatch(min(null));
                  dispatch(max(null));
                  modalRef.current.close();
                }}
              >
                Mặc định lọc
              </button>
            </div>
          </div>
        </dialog>
      </header>
    </CssContainer>
  );
};
const CssContainer = styled.div`
  .swiper-button-next,
  .swiper-button-prev {
    border: 1px solid gray;
    border-radius: 100%;
    width: 28px;
    height: 28px;
    color: black;
  }
  .swiper-button-next:after,
  .swiper-rtl .swiper-button-prev:after {
    font-size: 12px;
    font-weight: 900;
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
