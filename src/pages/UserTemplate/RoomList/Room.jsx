import { Card } from "antd";
import Heart from "../../../Icons/heart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Room({ room, dataLocation }) {
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const result = dataLocation?.find((location) => room.maViTri === location.id);

  return (
    <Card
      hoverable
      onClick={() => {
        navigate(`/detail/${room.id}`);
      }}
      cover={
        <div className="rounded-t-lg overflow-hidden relative">
          <p className="absolute top-2 right-2 hover:scale-110">
            <Heart isLike={isLike} setIsLik={setIsLike} />
          </p>
          <img
            alt="example"
            src={room.hinhAnh}
            className="w-full h-[240px] object-cover"
          />
        </div>
      }
    >
      <h3 className="line-clamp-2 overflow-hidden min-h-[44px]">
        {room.tenPhong}
      </h3>
      {result && (
        <p className="font-medium">
          {result.tenViTri} - {result.tinhThanh} - {result.quocGia}
        </p>
      )}
      <p>
        <span className="font-bold">₫ {room.giaTien}</span> / đêm
      </p>
    </Card>
  );
}
