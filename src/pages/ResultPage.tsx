import LoadingPage from "components/Ui/LoadingPage";
import ModelRoom from "components/Ui/ModelRoom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispath } from "store";
import { getLocationThunk } from "store/GetViTri/thunk";
import { max, min } from "store/filterPrice/slice";
import { getRoomByLocationThunk } from "store/getRoomByLocation/thunk";
import { setAction } from "store/searchSlice/slice";

const ResultPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispath();
  const { roomByLocation, isPending } = useSelector(
    (state: RootState) => state.roomByLocationReducer
  );
  const { location } = useSelector(
    (state: RootState) => state.getLocationReducer
  );
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.fitlerReducer
  );
  const detailLocation = location && location[Number(id) - 1];
  const sortRoom = roomByLocation?.filter((item) =>
    (minPrice || maxPrice) !== null
      ? item.giaTien >= minPrice && item.giaTien <= maxPrice
      : item
  );
  useEffect(() => {
    dispatch(getRoomByLocationThunk(Number(id)));
    dispatch(getLocationThunk());
    dispatch(min(null));
    dispatch(max(null));
    dispatch(setAction(false));
  }, [id]);
  if (isPending) return <LoadingPage />;
  return (
    <main className="w-[95%] max-sm:w-[90%] py-5  mx-auto">
      {(roomByLocation.length && sortRoom.length) > 0 ? (
        <div className="space-y-5 max-sm:space-y-3">
          <div className="text-2xl max-sm:text-lg font-600">
            {detailLocation && (
              <div className="sm:space-y-3">
                <p className="font-600 text-lg max-sm:text-base">
                  {sortRoom.length} kết quả hiển thị
                </p>
                <p>
                  {detailLocation?.tenViTri}, {detailLocation?.tinhThanh}
                </p>
              </div>
            )}
          </div>
          {detailLocation && (
            <div className="sm:space-x-3 max-sm:space-y-5">
              <button className="rounded-lg max-sm:mx-1 hover:bg-black/10 border-black/60 border text-sm p-8 px-5 font-600 bg-black/5">
                Điểm đến
              </button>
              <button className="p-8 rounded-lg max-sm:mx-1 hover:bg-black/10 px-5 text-sm border-black/60 border font-600 bg-black/5">
                Nơi ở
              </button>
              <button className="p-8 hover:bg-black/10 max-sm:mx-1 rounded-lg text-sm border-black/60 border px-5 bg-black/5 font-600">
                Du lịch
              </button>
              <button className="p-8 hover:bg-black/10 max-sm:mx-1 rounded-lg text-sm border-black/60 border px-5 bg-black/5 font-600">
                Giá vé
              </button>
            </div>
          )}
          <section className="flex">
            <ModelRoom modelRooms={sortRoom} />
          </section>
        </div>
      ) : (
        <div className="h-[50vh] items-center flex justify-center text-3xl font-600">
          <h3>không tìm thấy kết quả!!</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-frown"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
        </div>
      )}
    </main>
  );
};

export default ResultPage;
