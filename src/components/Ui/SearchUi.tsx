import { useEffect, useState } from "react";
import AddGuess from "./AddGuess";
import SearchIcon from "./icon/SearchIcon";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import { RootState, useAppDispath } from "store";
import { getLocationThunk } from "store/GetViTri/thunk";
import { useSelector } from "react-redux";
import { location } from "types/ViTri";
import { useNavigate } from "react-router-dom";
const SearchUi = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pet, setPet] = useState(0);
  const [bookingDate, setBookingDate] = useState(false);
  const dispatch = useAppDispath();
  const { location } = useSelector(
    (state: RootState) => state.getLocationReducer
  );
  const navigate = useNavigate();
  const [address, setAddress] = useState<location>();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
    },
  ]);
  useEffect(() => {
    dispatch(getLocationThunk());
  }, []);
  return (
    <section className={`cursor-pointer z-[100] transition-all`}>
      <div
        className={`border flex shadow pr-5 hover:shadow-md transition-all  items-center rounded-full ${
          open ? "scale-110 translate-y-[20px] " : ""
        }`}
      >
        {!open && (
          <div
            onClick={() => setOpen(true)}
            className="flex p-3 space-x-7 px-7"
          >
            <p className="border-r pr-5">Địa điểm bất kỳ</p>
            <p className="border-r pr-5">Tuần bất kỳ</p>
            <p>Thêm khách</p>
          </div>
        )}
        {open && (
          <section className="flex">
            {/* find location */}
            <div
              onClick={() => setBookingDate(false)}
              className="dropdown border-r dropdown-bottom"
            >
              <div
                tabIndex={0}
                className="p-3   hover:bg-black/5 relative px-7 space-y-4 h-full rounded-full"
              >
                <p>Địa điểm bất kỳ</p>
                <p className="font-normal text-sm">
                  {address && (
                    <span>
                      {address.tinhThanh}, {address.tenViTri}
                    </span>
                  )}
                  {!address?.tenViTri && "Tìm kiếm điểm đến"}
                </p>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content overflow-y-scroll space-y-5 w-[400px] border border-gray-300 shadow-xl z-[1] menu p-3 bg-white rounded"
              >
                {location?.map((item, index) => {
                  return (
                    <li key={index} onClick={() => setAddress(item)}>
                      <div className="flex items-center">
                        <img
                          src={item.hinhAnh}
                          className="h-9 w-9 rounded"
                          alt=""
                        />
                        <p className="flex flex-col">
                          <span>
                            {item.tenViTri}, {item.tinhThanh}
                          </span>
                          <span className="font-400">{item.quocGia}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
            {/* bookingDate */}
            <div>
              <section
                onClick={() => setBookingDate(!bookingDate)}
                className="flex"
              >
                <div className="border-r">
                  <div className="p-3 hover:bg-black/5 px-7 space-y-4 h-full rounded-full">
                    <p>Nhận phòng</p>
                    <p className="font-normal text-sm">
                      {format(date[0]?.startDate, "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                <div className="border-r">
                  <div className="p-3 hover:bg-black/5 px-7 space-y-4 rounded-full">
                    <p>Trả phòng</p>
                    <p className="font-normal text-sm">
                      {format(date[0]?.endDate, "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
              </section>
              {bookingDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  direction="horizontal"
                  ranges={date}
                  months={1}
                  dateDisplayFormat="dd/MM/yyyy" // Định dạng hiển thị của ngày
                  minDate={new Date()}
                  className="border absolute top-[80px] right-[100px] bg-white z-10 !text-black rounded-xl border-gray-400 p-5 shadow"
                >
                  <p>Chọn</p>
                </DateRange>
              )}
            </div>
            {/* add guess */}
            <div
              onClick={() => setBookingDate(false)}
              className="dropdown dropdown-bottom dropdown-end"
            >
              <div
                tabIndex={0}
                className="p-3 hover:bg-black/5 relative px-7 space-y-4 h-full rounded-full"
              >
                <p>Khách</p>
                <p className="font-normal line-clamp-1 w-[100px] text-sm">
                  {" "}
                  {adults} khách{children > 0 && `, ${children} em bé`}
                  {pet > 0 && `, ${pet} thú cưng`}
                </p>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content space-y-5 w-[400px] border border-gray-300 shadow-xl z-[1] menu p-3 bg-white rounded"
              >
                <div className="flex justify-between items-center text-base">
                  <section>
                    <p className="font-bold">Người lớn</p>
                    <p className="text-sm font-normal">Từ 13 tuổi trở lên</p>
                  </section>
                  <AddGuess
                    maxGuess={2}
                    isAdult
                    state={adults}
                    setState={setAdults}
                  />
                </div>
                <section className="flex justify-between items-center">
                  <section>
                    <p className="font-bold">Trẻ em</p>
                    <p className="text-sm font-normal">Từ 2 đến 12 tuổi </p>
                  </section>
                  <AddGuess
                    state={children}
                    isChildren
                    setState={setChildren}
                  />
                </section>
                <section className="flex items-center justify-between">
                  <section>
                    <p className="font-bold">Thú cưng</p>
                    <p className="text-sm font-normal">Chó, mèo...</p>
                  </section>
                  <AddGuess isPet state={pet} setState={setPet} />
                </section>
              </ul>
            </div>
          </section>
        )}
        <div
          onClick={() => {
            setOpen(!open);
            open && address && navigate(`/results/${address?.id}`);
          }}
          className="bg-mainColor border-r flex items-center justify-center p-3 rounded-full"
        >
          <SearchIcon />
        </div>
        {open && (
          <div className="ml-5" onClick={() => setOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="gray"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
};
export default SearchUi;
