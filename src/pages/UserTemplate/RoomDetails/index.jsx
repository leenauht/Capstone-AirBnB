import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchLocation } from "../RoomList/sliceLocation";
import { dataUtil } from "./data";
import ListComment from "./ListComment";
import { fetchRoomDetail } from "./sliceRoomDetail";
import React from "react";
import Booking from "./Booking";
import Star from "./../../../Icons/Star";
import Loading from "../_component/Loading";

export default function RoomDetail() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { loading: loadingRoomDetail, data: room } = useSelector(
    (state) => state.roomDetailReducer
  );
  const { data: dataLocation, loading: loadingLocation } = useSelector(
    (state) => state.locationReducer
  );

  const [dataRating, setDataRating] = useState([]);
  const locationId = searchParams.get("locationId");
  const roomId = searchParams.get("roomId");

  const location = dataLocation?.find((item) => item.id === Number(locationId));

  const handleRating = (listRating) => {
    setDataRating(listRating);
  };

  const renderRating = () => {
    if (!dataRating) return null;

    const sum = dataRating?.reduce(
      (total, item) => total + item.saoBinhLuan,
      0
    );
    const average = (sum / dataRating.length).toFixed(1);
    return (
      <div className="py-5 flex gap-1 items-center text-lg font-medium">
        <div className="flex items-center gap-1">
          <Star />
          <span>{average}</span>
        </div>
        {"-"}
        <div className="underline text-base">{dataRating.length} đánh giá</div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomDetail(roomId));
    }
  }, [roomId]);

  if (loadingRoomDetail && loadingLocation)
    return <Loading open={loadingRoomDetail || loadingLocation} />;

  return (
    <div className="pt-[120px] max-w-[80%] mx-auto">
      <div>
        <h2 className="text-xl font-semibold">{room?.tenPhong}</h2>
        <img
          src={room?.hinhAnh}
          alt="Logo"
          className="my-5 rounded-xl h-[120px] sm:h-[200px] lg:h-[300px] xl:h-[400px] w-full object-cover"
        />
        <div className="lg:flex lg:justify-between">
          <div className="md:w-3/5">
            <div className="py-5">
              {location && (
                <h3 className="text-2xl font-medium">
                  Nhà nghỉ tại {location.tenViTri} - {location.tinhThanh} -{" "}
                  {location.quocGia}
                </h3>
              )}

              <p>
                {room?.khach} khách - {room?.phongNgu} phòng ngủ -{" "}
                {room?.giuong} giường - {room?.phongTam} phòng tắm
              </p>
            </div>
            {renderRating()}
            <div className="space-y-3 py-5">
              <p className="text-lg font-medium">Nơi này có những gì cho bạn</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
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
              <h3 className="text-lg font-medium">Giới thiệu về chỗ ở</h3>
              <p>{room?.moTa}</p>
            </div>
          </div>

          <Booking room={room} />
        </div>
      </div>
      <ListComment dataRating={handleRating} id={roomId} />
    </div>
  );
}
