import { useNavigate } from "react-router-dom";
import DropdownBooking from "./DropdownBooking";
import Payment from "./Payment";
import { useRef, useState } from "react";
import SelectDatePicker from "./DatePicker";

export default function Booking({ id }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onShowModalPayment = () => {
    setShowModal(true);
  };

  const handleOpenPicker = () => {
    setOpen(true);
  };

  return (
    <div className="shadow-box-shadow-2 w-4/5 sm:w-3/5 lg:w-[34%] p-5 rounded-xl h-fit">
      <div>
        <p>
          <span className="font-bold text-2xl">₫2.123.586</span> / đêm
        </p>
        <div className="mt-6 mb-4 w-full border border-gray-400 rounded-xl">
          <div
            onClick={handleOpenPicker}
            className="relative border-b flex flex-col cursor-pointer overflow-hidden border-gray-400 hover:border hover:border-black hover:rounded-xl"
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

          <DropdownBooking />
        </div>
        <button
          onClick={onShowModalPayment}
          className="text-white rounded-lg w-full py-3 bg-gradient-to-r from-[#e61e4d] to-[#d70466]"
        >
          Đặt phòng
        </button>
        <p className="text-center text-[15px] py-3 text-gray-700">
          Bạn vẫn chưa bị trừ tiền
        </p>

        <div className="flex justify-between pb-5 items-center">
          <div className="space-y-2 underline">
            <p>₫2.123.586 x đêm</p>
            <p>Phí dịch vụ Airbnb</p>
          </div>
          <div className="space-y-2">
            <p>₫12.741.516</p>
            <p>₫2.123.586</p>
          </div>
        </div>

        <hr />

        <div className="flex justify-between items-center font-medium pt-5">
          <p>Tổng trước thuế</p>
          <p>₫14.702.215</p>
        </div>
      </div>
      <Payment open={showModal} setOpen={setShowModal} />
    </div>
  );
}
