import { Card } from "antd";
import Heart from "../../../Icons/heart";

export default function Room({ room, dataLocation }) {
  const result = dataLocation?.find((location) => room.maViTri === location.id);

  return (
    <Card
      hoverable
      cover={
        <div className="rounded-t-lg overflow-hidden relative">
          <p className="absolute top-2 right-2 hover:scale-110">
            <Heart />
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
      <p>
        {result.tenViTri} - {result.tinhThanh} - {result.quocGia}
      </p>
      <p>
        <span className="font-bold">₫ {room.giaTien}</span> / đêm
      </p>
    </Card>
  );
}
