import { useEffect, useState } from "react";
import SearchIcon from "./icon/SearchIcon";
import { RootState, useAppDispath } from "store";
import { getLocationThunk } from "store/GetViTri/thunk";
import { useSelector } from "react-redux";
import { setAction } from "store/searchSlice/slice";
import { location } from "types/ViTri";
import { useNavigate } from "react-router-dom";
const SearchUiRps = () => {
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const dispatch = useAppDispath();
  const { location } = useSelector(
    (state: RootState) => state.getLocationReducer
  );
  const navigate = useNavigate();
  const [address, setAddress] = useState<location>();

  useEffect(() => {
    dispatch(getLocationThunk());
  }, []);
  return (
    <section
      className={`relative lg:hidden cursor-pointer max-w-[400px] z-[100] transition-all`}
    >
      <div className="font-500 border flex justify-between space-x-3 shadow hover:shadow-md transition-all pr-7 max-lg:text-sm  items-center rounded-full">
        <div onClick={() => dispatch(setAction(true))} className="flex ">
          <div
            onClick={() => {
              setOpenLocation(!openLocation);
            }}
            className="p-3 hover:bg-black/5 px-7 rounded-tl-full rounded-bl-full"
          >
            <p className="text-lg max-sm:text-base line-clamp-1">
              {address
                ? `${address?.tenViTri}, ${address.tinhThanh}`
                : "Tìm kiếm địa điểm cụ thể"}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            dispatch(setAction(true));
            address && navigate(`/results/${address?.id}`);
          }}
          className="bg-mainColor border-r flex items-centerjustify-center p-3 rounded-full"
        >
          <SearchIcon />
        </div>
      </div>
      {openLocation && (
        <div className="h-[400px] w-full border shadow left-0 absolute rounded-lg bg-white overflow-y-scroll">
          {location?.map((item, index) => {
            return (
              <div>
                <div
                  key={index}
                  onClick={() => {
                    setAddress(item);
                    setOpenLocation(false);
                  }}
                  className="flex items-center p-5 hover:bg-black/5 space-x-3"
                >
                  <img
                    src={item.hinhAnh}
                    className="h-11 w-11 object-cover rounded"
                    alt=""
                  />
                  <p className="flex flex-col">
                    <span>
                      {item.tenViTri}, {item.tinhThanh}
                    </span>
                    <span className="text-gray-500 font-400 text-base">
                      {item.quocGia}
                    </span>
                  </p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default SearchUiRps;
