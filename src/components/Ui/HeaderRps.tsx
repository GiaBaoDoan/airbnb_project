import { useRef, useState } from "react";
import SearchUiRps from "./SearchRps";
import Filter from "./icon/Filter";
import { useAppDispath } from "store";
import featureJson from "../../JSON/FeaturesInRoom.json";
import { addFeature, max, min } from "store/filterPrice/slice";
type Feature = {
  text: string;
  val: string;
};
const HeaderRps = () => {
  const dispatch = useAppDispath();
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

  return (
    <div className="border xl:hidden p-5 top-header shadow">
      <div className="flex space-x-5 justify-between items-center">
        <SearchUiRps />
        <div
          onClick={() => modalRef?.current?.showModal()}
          className="border xl:hidden hover:bg-black/5 border-gray-400 h-full flex cursor-pointer items-center space-x-3 p-3 rounded-xl"
        >
          <Filter />
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
            <div className="text-lg">
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
            <div className="text-lg">
              <div className="flex items-center space-x-3">
                <span>
                  Giá{" "}
                  {Number(maxPrice) < Number(minPrice) ? "tối thiểu" : "tối đa"}
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
            <span className="font-600 text-lg">Tính năng cho căn phòng</span>
            <div className="flex flex-wrap gap-5 mt-5">
              {featureJson?.map((item) => (
                <button
                  key={item.val}
                  onClick={() => handelFeature(item)}
                  className={`flex space-x-4 items-center ${
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
              className="bg-black/100 px-7 font-600 rounded-lg py-3 text-white"
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
    </div>
  );
};

export default HeaderRps;
