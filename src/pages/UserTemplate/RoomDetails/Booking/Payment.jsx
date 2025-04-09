import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { bookingRoom, resetBooking } from "../sliceRoomDetail";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../../../utils";

export default function Payment(props) {
  const { setOpen, open } = props;
  const {
    dateRange,
    serviceFee,
    price,
    total,
    data,
    surcharge,
    countUser,
    diffDays,
    bookingStatus,
  } = useSelector((state) => state.roomDetailReducer);
  const [startDate, endDate] = dateRange;
  const dispatch = useDispatch();

  const formatted = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  useEffect(() => {
    if (bookingStatus.status === "success") {
      toastSuccess("Đặt phòng thành công");
      setOpen(false);
    }
    if (bookingStatus.status === "faild") {
      toastError("Có lỗi xảy ra");
    }
    return () => {
      dispatch(resetBooking());
    };
  }, [bookingStatus.status]);
  return (
    <Modal
      title={
        <div className="text-center w-full text-2xl font-bold">Đặt phòng</div>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={<></>}
    >
      <List className="w-full" itemLayout="horizontal">
        <List.Item>
          <div>
            <h4 className="text-lg font-medium">Chuyến đi của bạn</h4>
            <p className="text-gray-500">
              Từ ngày {formatted(startDate)} - {formatted(endDate)}
            </p>
          </div>
        </List.Item>
        <List.Item>
          <div>
            <h4 className="text-lg font-medium">Khách</h4>
            <p className="text-gray-500">{countUser} khách</p>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex justify-between w-full items-center">
            <div>
              <h4 className="text-lg font-medium">Giá tiền</h4>
              <div>
                <span className="font-bold text-lg">
                  ₫{data?.giaTien?.toLocaleString?.("vi-VN")}
                </span>{" "}
                / <span className="text-gray-500">đêm</span>
              </div>
            </div>
            <div>
              <span className="text-gray-500">{diffDays} đêm</span>
              {" / "}
              <span className="font-bold text-lg">
                ₫{price.toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex justify-between w-full">
            <h4 className="text-lg font-medium">Phí dịch vụ Airbnb</h4>
            <p className="font-bold text-lg">
              ₫{serviceFee.toLocaleString("vi-VN")}
            </p>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex justify-between w-full">
            <h4 className="text-lg font-medium">Phụ phí</h4>
            <p className="font-bold text-lg">
              ₫{surcharge.toLocaleString("vi-VN")}
            </p>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex justify-between w-full">
            <h4 className="text-lg font-medium">Tổng trước thuế</h4>
            <p className="font-bold text-lg">
              ₫{total.toLocaleString("vi-VN")}
            </p>
          </div>
        </List.Item>

        <List.Item></List.Item>
      </List>
      <div className="flex justify-end">
        <Button
          loading={bookingStatus.loading}
          onClick={() => dispatch(bookingRoom())}
        >
          Đặt phòng
        </Button>
      </div>
    </Modal>
  );
}
