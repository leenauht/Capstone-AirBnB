import { useNavigate } from "react-router-dom";
import DropdownBooking from "./DropdownBooking";
import Payment from "./Payment";
import { useState } from "react";

export default function Booking({ id }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onShowModalPayment = () => {
    setShowModal(true);
  };

  return (
    <div className="shadow-box-shadow-1 w-[34%] p-5 rounded-xl h-fit">
      <div>
        <p>
          <span className="font-bold text-2xl">₫2.123.586</span> / đêm
        </p>
        <div className="grid grid-row-2 mt-6 mb-4 w-full border border-gray-400 rounded-xl">
          <div className="grid grid-cols-2 cursor-pointer border-b overflow-hidden border-gray-400 hover:border hover:border-black hover:rounded-xl">
            <div className="p-4 border-r border-gray-400">
              <p className="font-bold text-xs leading-3 uppercase">
                Nhận phòng
              </p>
              <p className="text-gray-500 font-medium">Thêm ngày</p>
            </div>
            <div className="p-4">
              <p className="font-bold text-xs leading-3 uppercase">
                Nhận phòng
              </p>
              <p className="text-gray-500 font-medium">Thêm ngày</p>
            </div>
          </div>

          <DropdownBooking />
        </div>
        <button
          onClick={
            // () => navigate(`/detail/${id}/payment`)
            onShowModalPayment
          }
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
