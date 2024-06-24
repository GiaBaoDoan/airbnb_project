import { useEffect, useState } from "react";
import AddGuess from "./AddGuess";
import SearchIcon from "./icon/SearchIcon";
import { DateRange } from "react-date-range";
import { RootState, useAppDispath } from "store";
import { getLocationThunk } from "store/GetViTri/thunk";
import { useSelector } from "react-redux";
import { setAction } from "store/searchSlice/slice";
import { location } from "types/ViTri";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const SearchUiRps = () => {
  const [adults, setAdults] = useState(0);
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const [children, setChildren] = useState(0);
  const [openGuesst, setOpenGuest] = useState(false);
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
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  useEffect(() => {
    dispatch(getLocationThunk());
  }, []);
  return (
    <section className={`relative cursor-pointer z-[100] transition-all`}>
      <div className="border font-500 flex shadow hover:shadow-md transition-all pr-7 max-lg:text-sm  items-center rounded-full">
        <div onClick={() => dispatch(setAction(true))} className="flex ">
          <div
            onClick={() => {
              setOpenLocation(!openLocation);
              setBookingDate(false);
              setOpenGuest(false);
            }}
            className="border-r p-3 hover:bg-black/5 pl-7 rounded-tl-full rounded-bl-full"
          >
            <p className="line-clamp-1">
              {address
                ? `${address?.tenViTri}, ${address.tinhThanh}`
                : "Địa điểm"}
            </p>
          </div>
          <div
            onClick={() => {
              setBookingDate(!bookingDate);
              setOpenGuest(false);
              setOpenLocation(false);
            }}
            className="border-r p-3 px-5 hover:bg-black/5"
          >
            <p className="flex line-clamp-1">
              {date[0].startDate
                ? moment(date[0].startDate).format("DD/MM/YYYY") +
                  " ~ " +
                  moment(date[0].endDate).format("DD/MM/YYYY")
                : "Tuần bất kỳ"}
            </p>
          </div>
          <div
            onClick={() => {
              setOpenGuest(!openGuesst);
              setBookingDate(false);
              setOpenLocation(false);
            }}
            className="hover:bg-black/5 p-3 "
          >
            <div className="px-7 space-y-4 h-full rounded-full">
              <div className="line-clamp-1 max-w-[100px]">
                {!adults && !children && !pet ? (
                  <p>Thêm khách</p>
                ) : (
                  <p>
                    {adults} khách {children > 0 && `, ${children} em bé`}
                    {pet > 0 && `, ${pet} thú cưng`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            dispatch(setAction(true));
            setOpenLocation(false);
            setBookingDate(false);
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
      {bookingDate && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          direction="horizontal"
          ranges={date}
          months={2}
          dateDisplayFormat="dd/MM/yyyy" // Định dạng hiển thị của ngày
          minDate={new Date()}
          className="absolute w-full bg-white z-10 !text-black rounded-xl p-5 shadow-lg"
        >
          <p>Chọn</p>
        </DateRange>
      )}
      {openGuesst && (
        <div className="space-y-5 w-full border absolute shadow-lg rounded-lg z-[1] menu p-3 bg-white">
          <div className="flex justify-between items-center text-base">
            <section>
              <p className="font-600">Người lớn</p>
              <p className="text-sm font-normal">Độ tuổi 13 tuổi trở lên</p>
            </section>
            <AddGuess
              maxGuess={2}
              isAdult
              state={adults}
              setState={setAdults}
            />
          </div>
          <section className="flex justify-between items-center text-base">
            <section>
              <p className="font-600">Trẻ em</p>
              <p className="text-sm font-normal">Độ tuổi 2 đến 12 tuổi </p>
            </section>
            <AddGuess state={children} isChildren setState={setChildren} />
          </section>
          <section className="flex items-center justify-between text-base">
            <section>
              <p className="font-600">Thú cưng</p>
              <p className="text-sm font-normal">Chó, mèo...</p>
            </section>
            <AddGuess isPet state={pet} setState={setPet} />
          </section>
        </div>
      )}
    </section>
  );
};
export default SearchUiRps;
