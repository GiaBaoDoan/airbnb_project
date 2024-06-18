import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, useAppDispath } from "store";
import { Link, useParams } from "react-router-dom";
import { getAirbnbListThunk } from "store/quanLyAirbnb/thunk";
const ListRoom = () => {
  const dispatch = useAppDispath();
  const { id } = useParams();
  const { AirbnbList } = useSelector((state: RootState) => state.quanLyAirbnb);
  const { listRooms } = useSelector(
    (state: RootState) => state.findRoomReducer
  );
  const { location } = useSelector(
    (state: RootState) => state.getLocationReducer
  );
  const Place = location?.find((item) => {
    return item.id == Number(id);
  });
  useEffect(() => {
    dispatch(getAirbnbListThunk());
  }, [dispatch, id]);

  return (
    <>
      <div className="pt-[20px] mb-[55px] font-semibold items-center  justify-between">
        <div className="">
          <section className="flex items-center sticky top-0 z-11  ">
            <img
              className="w-16 max-ip678Plus:w-[40px]  mx-auto cursor-pointer"
              src={
                window.location.origin +
                "/images/AirbnbRoomImg/AirbnbroomIcon/air-conditioner.png"
              }
              alt=".../"
            />
            <img
              className="w-16 max-ip678Plus:w-[40px]  mx-auto cursor-pointer"
              src={
                window.location.origin +
                "/public/images/AirbDetaiImg/AirbDetailIcon/parking.png"
              }
              alt=".../"
            />
            <img
              className="w-16 max-ip678Plus:w-[40px]  mx-auto cursor-pointer"
              src={
                window.location.origin +
                "/public/images/AirbDetaiImg/AirbDetailIcon/television.png"
              }
              alt=".../"
            />
            <img
              className="w-16 max-ip678Plus:w-[40px]  mx-auto cursor-pointer"
              src={
                window.location.origin +
                "/public/images/AirbDetaiImg/AirbDetailIcon/wifi.png"
              }
              alt=".../"
            />{" "}
            <img
              className="w-16 max-ip678Plus:w-[40px]  mx-auto cursor-pointer"
              src={
                window.location.origin +
                "/public/images/AirbDetaiImg/AirbDetailIcon/iron2.png"
              }
              alt=".../"
            />
          </section>
          <section
            className={`${
              id
                ? listRooms?.length
                  ? ""
                  : "h-[435px]"
                : AirbnbList
                ? ""
                : "h-[435px]"
            }`}
          >
            <div
              className={`grid desktop:grid-cols-3 w-[90%]  mx-auto max-ipad:grid-cols-1 gap-[20px] grid-cols-2 items-center ipad:mx-auto `}
            >
              {(id && listRooms ? listRooms : AirbnbList)?.map((room) => (
                <div key={room.id}>
                  <Link to={`/AirBnbDetail/${room.id}`}>
                    <div className=" cursor-pointer shadow-lg  mx-auto rounded-2xl border-2 m-5 hover:scale-105 transition-transform duration-300 ease-in-out  ">
                      <div>
                        <img
                          className="rounded-t-lg w-full shadow-lg"
                          src={room.hinhAnh}
                          alt=".../"
                        />
                      </div>

                      <div className="p-5">
                        {listRooms
                          ? id && (
                              <p className="text-[20px]  text-gray-500">{`${Place?.tenViTri},${Place?.tinhThanh}`}</p>
                            )
                          : ""}
                        <a href="#">
                          <h5 className="mb-2  max-ipad:hidden text-xl font-bold tracking-tight ">
                            {room.tenPhong.length > 50
                              ? room.tenPhong.substring(0, 30) + "..."
                              : room.tenPhong}
                          </h5>
                          <h5 className="mb-2 ipad:hidden text-2xl font-bold tracking-tight ">
                            {room.tenPhong}
                          </h5>
                        </a>
                        <p className=" font-normal text-gray-600 dark:text-gray-400">
                          Number of Bedrooms: {room.phongNgu}
                        </p>
                        <p className=" mb-3 font-normal text-gray-600 dark:text-gray-400">
                          {" "}
                          Guest Capacity: {room.khach}
                        </p>
                        <div className="flex justify-between cursor-pointer">
                          <div className="text-2xl text-mainColor ">
                            ${room.giaTien}{" "}
                            <span className=" font-thin text-lg text-black">
                              /Night
                            </span>
                          </div>
                          <button className="border border-mainColor p-[5px] hover:translate-y-[-20%] transition-all duration-500 bg-mainColor text-white rounded-[5px]">
                            {" "}
                            <span>Read more</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ListRoom;
