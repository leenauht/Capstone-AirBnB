import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Heart from "../../../Icons/Heart";
import { useDispatch, useSelector } from "react-redux";
import { resetBooking } from "../RoomDetails/sliceRoomDetail";

export default function Room({ location, room }) {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const imgDefault =
    "https://a0.muscache.com/im/pictures/miso/Hosting-1296043685685721430/original/4d135661-995c-4a54-a0bc-d714c3089934.jpeg?im_w=720";
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cacheName = `${userInfo?.id || "anonymus"}-roomLike`;

  const onLike = (status) => {
    let newRoomLike = [];
    const roomLike = localStorage.getItem(cacheName);
    if (roomLike) {
      const dataJSON = JSON.parse(roomLike);
      if (status) {
        newRoomLike = [...dataJSON, room.id];
      } else {
        newRoomLike = dataJSON.filter((item) => item !== room.id);
      }
    } else {
      newRoomLike = [room.id];
    }

    localStorage.setItem(cacheName, JSON.stringify(newRoomLike));
    setIsLike(status);
  };

  useEffect(() => {
    const roomLike = localStorage.getItem(cacheName);
    const dataJSON = JSON.parse(roomLike) || [];
    const statusRoom = dataJSON.find((item) => room.id === item);
    setIsLike(!!statusRoom);
  }, [cacheName]);

  return (
    <Card
      className="max-h-[400px]"
      hoverable
      onClick={() => {
        navigate(`/detail?roomId=${room.id}&locationId=${room.maViTri}`);
        dispatch(resetBooking());
      }}
      cover={
        <div className="rounded-t-lg overflow-hidden relative">
          <p className="absolute top-2 right-2 hover:scale-110">
            <Heart isLike={isLike} setIsLike={setIsLike} onLike={onLike} />
          </p>
          <img
            alt="example"
            src={`${location.hinhAnh ? location.hinhAnh : imgDefault}`}
            className="w-full h-[240px] object-cover"
          />
        </div>
      }
    >
      {" "}
      <div className="space-y-2">
        <p className="font-medium line-clamp-1">
          {location.tenViTri} - {location.tinhThanh} - {location.quocGia}
        </p>
        <p className="line-clamp-2">{room.tenPhong}</p>
        {room && (
          <p>
            <span className="font-bold">
              ₫ {room.giaTien.toLocaleString("vi-VN")}
            </span>{" "}
            / đêm
          </p>
        )}
      </div>
    </Card>
  );
}
