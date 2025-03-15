import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoomList } from "../RoomList/sliceRoomList";
import { fetchLocation } from "../RoomList/sliceLocation";
import RentalAmenities from "./RentalAmenities";

export default function RoomDetail() {
  const dispath = useDispatch();
  const state = useSelector((state) => state.roomListReducer);
  const stateLocation = useSelector((state) => state.locationReducer);
  const { data } = state;
  const { id } = useParams();

  const room = data?.find((room) => room.id === Number(id));
  const location = stateLocation?.data?.find(
    (item) => room.maViTri === item.id
  );
  console.log("location", location);
  console.log(room);
  console.log(data);

  const utilities = {
    mayGiat: "máy giặt",
    banLa: "bàn là",
    tivi: "ti vi",
    dieuHoa: "điều hòa",
    wifi: "wifi",
    bep: "bếp",
    doXe: "đỗ xe",
    hoBoi: "hồ bơi",
    banUi: "bàn ủi",
  };

  const trueValues = {};
  const falseValues = {};
  const support = {};
  const notSupport = {};

  Object.keys(room).forEach((key) => {
    if (typeof room[key] === "boolean") {
      room[key] ? (trueValues[key] = true) : (falseValues[key] = false);
    }
  });

  Object.entries(utilities).forEach(([key, value]) => {
    if (trueValues[key]) {
      support[key] = value;
    } else if (!falseValues[key]) {
      notSupport[key] = value;
    }
  });

  useEffect(() => {
    dispath(fetchRoomList());
    dispath(fetchLocation());
  }, []);

  return (
    <div className="pt-[120px] max-w-[80%] mx-auto">
      <div>
        <h2 className="text-xl font-semibold">{room.tenPhong}</h2>
        <img src={room.hinhAnh} alt="Logo" />
        <h3 className="text-lg font-medium">
          Nhà nghỉ tại {location.tenViTri} - {location.tinhThanh} -{" "}
          {location.quocGia}
        </h3>
        <p>
          {room.khach} khách - {room.phongNgu} phòng ngủ - {room.giuong} giường
          - {room.phongTam} phòng tắm
        </p>
        <div>
          <p>Tiện ích và đồ gia dụng</p>
          <p>
            <span>Hỗ trợ: </span>
            <RentalAmenities data={support} />
          </p>
          <p>
            <span>Không hỗ trợ: </span>
            <RentalAmenities data={notSupport} />
          </p>
        </div>
      </div>
    </div>
  );
}
