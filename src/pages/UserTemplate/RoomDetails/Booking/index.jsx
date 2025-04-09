import DropdownBooking from "./DropdownBooking";
import Payment from "./Payment";
import { useEffect, useState } from "react";
import SelectDatePicker from "./DatePicker";
import { useSelector } from "react-redux";
import { toastInfo } from "../../../../utils";

export default function Booking({ room }) {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { diffDays, serviceFee, price, total } = useSelector(
    (state) => state.roomDetailReducer
  );

  const onShowModalPayment = () => {
    if (userInfo === null || userInfo === undefined) {
      toastInfo("Đăng nhập để đặt phòng");
      return;
    }
    if (diffDays > 0) {
      setShowModal(true);
    } else {
      setOpen(true);
    }
  };

  const handleOpenPicker = () => {
    setOpen(true);
  };

  return (
    <div className="shadow-box-shadow-2 w-full sm:w-3/5 lg:w-[34%] p-5 rounded-xl h-fit">
      <div>
        <p>
          <span className="font-bold text-2xl">
            ₫{room?.giaTien.toLocaleString("vi-VN")}
          </span>{" "}
          / đêm
        </p>
        <div className="mt-6 mb-4 w-full border border-gray-400 rounded-xl box-border max-h-[135px] group ">
          <div
            onClick={handleOpenPicker}
            className="relative flex flex-col border border-transparent cursor-pointer overflow-hidden border-gray-400 hover:border hover:border-black hover:rounded-xl"
          >
            <div className="absolute left-1/2 w-[1px] h-full bg-gray-400"></div>
            <div className="flex gap-4 pt-4 px-4 border-gray-400">
              <p className="w-1/2 font-bold text-xs leading-3 uppercase">
                Nhận phòng
              </p>
              <p className="w-1/2 font-bold text-xs leading-3 uppercase">
                Trả phòng
              </p>
            </div>
            <SelectDatePicker open={open} setOpen={setOpen} />
          </div>

          <div className="h-[1px] w-full bg-gray-400 group-hover:bg-transparent"></div>

          <DropdownBooking questNumer={room?.khach} />
        </div>
        <button
          onClick={onShowModalPayment}
          className="text-white rounded-lg w-full py-3 bg-gradient-to-r from-[#e61e4d] to-[#d70466]"
        >
          Đặt phòng
        </button>
        {diffDays === 0 ? null : (
          <div className="min-h-auto">
            <p className="text-center text-[15px] py-3 text-gray-700">
              Bạn vẫn chưa bị trừ tiền
            </p>

            <div className="flex justify-between pb-5 items-center">
              <div className="space-y-2 underline font-medium">
                <p>
                  ₫ {room?.giaTien.toLocaleString("vi-VN")} x {diffDays} đêm
                </p>
                <p>Phí dịch vụ Airbnb</p>
              </div>
              <div className="space-y-2 font-medium">
                <p>₫ {price.toLocaleString("vi-VN")}</p>
                <p>₫ {serviceFee.toLocaleString("vi-VN")}</p>
              </div>
            </div>

            <hr />

            <div className="flex justify-between items-center font-medium pt-5">
              <p>Tổng trước thuế</p>
              <p>₫ {total.toLocaleString("vi-VN")}</p>
            </div>
          </div>
        )}
      </div>
      <Payment open={showModal} setOpen={setShowModal} />
    </div>
  );
}
