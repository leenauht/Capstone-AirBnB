import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLocation } from "../RoomList/sliceLocation";
import Rating from "./Rating";
import { dataUtil } from "./data";
import ListComment from "./ListComment";
import { fetchRoomDetail } from "./sliceRoomDetail";
import React from "react";
import Booking from "./Booking";

export default function RoomDetail() {
  const dispath = useDispatch();
  const { loading, data: room } = useSelector(
    (state) => state.roomDetailReducer
  );
  const state = useSelector((state) => state.locationReducer);
  const { id } = useParams();

  const location = state?.data?.find((item) => item.id === Number(id));

  useEffect(() => {
    dispath(fetchLocation());
  }, []);

  useEffect(() => {
    if (id) {
      dispath(fetchRoomDetail(id));
    }
  }, [id]);

  return (
    <div className="pt-[120px] max-w-[80%] mx-auto">
      <div>
        <h2 className="text-xl font-semibold">{room?.tenPhong}</h2>
        <img src={room?.hinhAnh} alt="Logo" className="my-5 rounded-xl" />
        <div className="flex justify-between">
          <div className="w-3/5">
            <div className="py-5">
              {location && (
                <h3 className="text-lg font-medium">
                  Nhà nghỉ tại {location.tenViTri} - {location.tinhThanh} -{" "}
                  {location.quocGia}
                </h3>
              )}

              <p>
                {room?.khach} khách - {room?.phongNgu} phòng ngủ -{" "}
                {room?.giuong} giường - {room?.phongTam} phòng tắm
              </p>
            </div>
            <div className="space-y-3 py-5 border-y-[1px]">
              <p className="text-lg font-medium">Đánh giá</p>
              <Rating />
            </div>
            <div className="space-y-3 py-5">
              <p className="text-[17px] font-medium">
                Nơi này có những gì cho bạn
              </p>
              <div className="grid grid-cols-3 gap-5">
                {dataUtil.map(({ name, field, svg: Icon }) => {
                  return (
                    <div key={name} className="flex items-center gap-5">
                      <Icon />
                      {room?.[field] ? <span>{name}</span> : <s>{name}</s>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 py-5">
              <h3 className="text-[17px] font-medium">Giới thiệu về chỗ ở</h3>
              <p>{room?.moTa}</p>
            </div>
          </div>

          <Booking id={id} />
        </div>
      </div>
      <ListComment />
    </div>
  );
}
