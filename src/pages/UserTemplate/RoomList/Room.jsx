import { Card } from "antd";
import Heart from "../../../Icons/heart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Room({ location, room }) {
  const imgDefault =
    "https://a0.muscache.com/im/pictures/miso/Hosting-1296043685685721430/original/4d135661-995c-4a54-a0bc-d714c3089934.jpeg?im_w=720";
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();

  console.log("roomId", room);

  const onLike = (status) => {
    let newRoomLike = [];
    const roomLike = localStorage.getItem("roomLike");
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
    localStorage.setItem("roomLike", JSON.stringify(newRoomLike));
    setIsLike(status);
  };

  useEffect(() => {
    const roomLike = localStorage.getItem("roomLike");
    if (roomLike) {
      const dataJSON = JSON.parse(roomLike);
      const statusRoom = dataJSON.find((item) => room.id === item);
      if (statusRoom) setIsLike(true);
    }
  }, []);

  return (
    <Card
      hoverable
      onClick={() => {
        navigate(`/detail/${location.id}`);
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
      <div className="space-y-4">
        <p className="font-medium line-clamp-1">
          {location.tenViTri} - {location.tinhThanh} - {location.quocGia}
        </p>
        {room && (
          <p>
            <span className="font-bold">₫ {room.giaTien}</span> / đêm
          </p>
        )}
      </div>
    </Card>
  );
}
