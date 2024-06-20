import LoadingPage from "components/Ui/LoadingPage";
import ModelRoom from "components/Ui/ModelRoom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispath } from "store";
import { getLocationThunk } from "store/GetViTri/thunk";
import { max, min } from "store/filterPrice/slice";
import { getRoomByLocationThunk } from "store/getRoomByLocation/thunk";

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
  }, [id]);
  if (isPending) return <LoadingPage />;

  return (
    <main className="w-[95%] py-12  mx-auto">
      {(roomByLocation.length && sortRoom.length) > 0 ? (
        <div className="space-y-5">
          <h3 className="text-2xl font-600">
            {detailLocation && (
              <p>
                Kết quả tìm thấy {detailLocation?.tenViTri},{" "}
                {detailLocation?.tinhThanh}
              </p>
            )}
          </h3>
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
