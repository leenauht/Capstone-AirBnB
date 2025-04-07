import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "./sliceBookingHistory";
import { getUserInfo } from "../../../../utils";
import { Card } from "antd";
import LabelItem from "../../_component/LabelItem";
import dayjs from "dayjs";
import Payment from "../../../../Icons/Payment";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const { historyList } = useSelector((state) => state.bookingHistoryReducer);
  const { data, loading } = historyList;
  useEffect(() => {
    const userInfo = getUserInfo();
    dispatch(fetchBookingHistory(userInfo.id));
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      {data.map((item, index) => {
        return (
          <Card
            key={item.id}
            className={`${index % 2 === 0 ? "bg-cyan-50" : "bg-cyan-100"}`}
          >
            <div className="space-y-2">
              <LabelItem
                label={"Mã phòng đặt:"}
                value={item.maPhong}
                classNameLabel="text-base"
                classNameValue="font-bold text-base"
              />

              <LabelItem
                label={"Số lượng khách: "}
                value={item.soLuongKhach}
                classNameLabel="text-base"
                classNameValue="font-bold text-base"
              />

              <LabelItem
                label={"Ngày nhận phòng: "}
                value={dayjs(`${item.ngayDen}`).format("DD/MM/YYYY")}
                classNameLabel="text-base"
                classNameValue="font-bold text-base"
              />

              <LabelItem
                label={"Ngày trả phòng: "}
                value={dayjs(`${item.ngayDi}`).format("DD/MM/YYYY")}
                classNameLabel="text-base"
                classNameValue="font-bold text-base"
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default BookingHistory;
