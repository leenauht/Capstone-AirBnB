import { Card } from "antd";
import Heart from "../../../Icons/heart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Room({ location, roomId }) {
  const imgDefault =
    "https://a0.muscache.com/im/pictures/miso/Hosting-1296043685685721430/original/4d135661-995c-4a54-a0bc-d714c3089934.jpeg?im_w=720";
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => {
        navigate(`/detail/${location.id}`);
      }}
      cover={
        <div className="rounded-t-lg overflow-hidden relative">
          <p className="absolute top-2 right-2 hover:scale-110">
            <Heart isLike={isLike} setIsLik={setIsLike} />
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
        {roomId && (
          <p>
            <span className="font-bold">₫ {roomId.giaTien}</span> / đêm
          </p>
        )}
      </div>
    </Card>
  );
}
