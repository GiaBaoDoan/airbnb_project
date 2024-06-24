import CardTravel from "./CardTravel";
import Star from "./icon/Star";
import { ListRooms } from "types/QuanLyPhong";
import RatingStar from "../../JSON/RatingStar.json";
import ImageCards from "../../JSON/ImagesCard.json";
const ModelRoom = ({ modelRooms }: { modelRooms: ListRooms[] }) => {
  return (
    <section className="space-y-5">
      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:grid-cols-3 gap-5">
        {modelRooms.map((room, index) => {
          return (
            <div key={room.id} className="space-y-3">
              <CardTravel images={ImageCards[index]} room={room} />
              <div className="space-y-8">
                <div className="flex items-center justify-between space-x-8">
                  <h3 className="line-clamp-1 text-xl max-lg:text-lg font-600">
                    {room.tenPhong}
                  </h3>
                  {RatingStar[index] && (
                    <div className="flex items-center space-x-4">
                      <Star />
                      <span>{String(RatingStar[index]).replace(".", ",")}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-xl max-lg:text-lg">
                  Cách phòng 2km
                </p>
                <p className="text-gray-600 text-xl max-lg:text-lg">
                  Ngày 08 - Ngày 13 tháng 6
                </p>
                <p>
                  <span className="font-bold text-xl max-lg:text-lg">
                    ${room.giaTien}
                  </span>{" "}
                  / đêm
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ModelRoom;
