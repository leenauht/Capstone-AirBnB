import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoomList } from "../RoomList/sliceRoomList";
import { fetchLocation } from "../RoomList/sliceLocation";
import Rating from "./Rating";
import { dataUtil } from "./data";
import Comment from "./Comment";
import Dropdown from "../../../components/DropDown";

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

  // const utilities = {
  //   mayGiat: "Máy giặt",
  //   banLa: "Bàn là",
  //   tivi: "Ti vi",
  //   dieuHoa: "Điều hòa",
  //   wifi: "Wifi",
  //   bep: "Bếp",
  //   doXe: "Đỗ xe",
  //   hoBoi: "Hồ bơi",
  //   banUi: "Bàn ủi",
  // };

  const dataBoolean = {};

  Object.keys(room).forEach((key) => {
    if (typeof room[key] === "boolean") {
      dataBoolean[key] = room[key];
    }
  });

  console.log(dataBoolean);

  const additionalValues = Object.entries(dataBoolean);
  console.log(additionalValues);

  // Gán từng giá trị vào object trong mảng
  const updatedArray = dataUtil.map((item, index) => ({
    ...item,
    utilitie: additionalValues[index][1], // Thêm giá trị tương ứng từ additionalData
  }));
  console.log(updatedArray);

  useEffect(() => {
    dispath(fetchRoomList());
    dispath(fetchLocation());
  }, []);

  return (
    <div className="pt-[120px] max-w-[80%] mx-auto">
      <div>
        <h2 className="text-xl font-semibold">{room.tenPhong}</h2>
        <img src={room.hinhAnh} alt="Logo" className="my-5 rounded-xl" />
        <div className="flex justify-between">
          <div className="w-3/5">
            <div className="py-5">
              <h3 className="text-lg font-medium">
                Nhà nghỉ tại {location.tenViTri} - {location.tinhThanh} -{" "}
                {location.quocGia}
              </h3>
              <p>
                {room.khach} khách - {room.phongNgu} phòng ngủ - {room.giuong}{" "}
                giường - {room.phongTam} phòng tắm
              </p>
            </div>
            <div className="space-y-3 pl-2.5 py-5 border-y-[1px]">
              <p className="text-[17px] font-medium">Đánh giá</p>
              <Rating />
            </div>
            <div className="space-y-3 py-5">
              <p className="text-[17px] font-medium">
                Nơi này có những gì cho bạn
              </p>
              <div className="grid grid-cols-3 gap-5">
                {updatedArray.map(({ name, utilitie, svg: Icon }) => {
                  return (
                    <div key={name} className="flex items-center gap-5">
                      <Icon />
                      {utilitie === true ? <span>{name}</span> : <s>{name}</s>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 py-5">
              <h3 className="text-[17px] font-medium">Giới thiệu về chỗ ở</h3>
              <p>{room.moTa}</p>
            </div>
          </div>

          <div className="shadow-box-shadow-1 w-[30%] p-5 rounded-xl">
            <div>
              <h1>1.000.000đ/đêm</h1>
              <div className="grid grid-cols-2 w-full border border-gray-400">
                <p className="border border-gray-400 p-4">Nhận phòng</p>
                <p className="border border-gray-400 p-4">Trả phòng</p>
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
}
