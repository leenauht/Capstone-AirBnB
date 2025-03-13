import { Card } from "antd";

export default function RoomList() {
  return (
    <div className="">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      ></Card>
    </div>
  );
}
