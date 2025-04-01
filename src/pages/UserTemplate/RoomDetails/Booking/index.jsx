import { useNavigate } from "react-router-dom";
import DropdownBooking from "./DropdownBooking";
import Payment from "./Payment";
import { useRef, useState } from "react";
import { DatePicker } from "antd";
import "dayjs/locale/vi"; // ✅ Import ngôn ngữ tiếng Việt
import locale from "antd/es/date-picker/locale/vi_VN"; // ✅ Dùng locale của antd
import dayjs from "dayjs";

export default function Booking({ id }) {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onShowModalPayment = () => {
    setShowModal(true);
  };
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day"); // Ngăn chọn ngày trước hôm nay
  };

  return (
    <div className="shadow-box-shadow-2 w-4/5 sm:w-3/5 lg:w-[34%] p-5 rounded-xl h-fit">
      <div>
        <p>
          <span className="font-bold text-2xl">₫2.123.586</span> / đêm
        </p>
        <div className="mt-6 mb-4 w-full border border-gray-400 rounded-xl">
          <div className="relative border-b flex flex-col cursor-pointer overflow-hidden border-gray-400 hover:border hover:border-black hover:rounded-xl">
            <div className="absolute left-1/2 w-[1px] h-full bg-gray-400"></div>
            <div className="flex gap-4 pt-4 px-4 border-gray-400">
              <p className="w-1/2 font-bold text-xs leading-3 uppercase">
                Nhận phòng
              </p>
              <p className="w-1/2 font-bold text-xs leading-3 uppercase">
                Trả phòng
              </p>
            </div>
            <div className="flex px-4 pb-4">
              <RangePicker
                locale={locale}
                disabledDate={disabledDate}
                variant="borderless"
                className="text-gray-500 w-full !z-50 p-0 font-medium placeholder:text-base border-none active:border-none"
                placeholder="Thêm ngày"
                format="DD/MM/YYYY"
                suffixIcon={null}
                separator={null}
                panelRender={(panelNode) => (
                  <div>
                    <div className="text-center p-2 font-bold">
                      🗓️ Lịch chọn ngày
                    </div>{" "}
                    {/* ✅ Header */}
                    {panelNode} {/* Hiển thị panel chính */}
                  </div>
                )}
                renderExtraFooter={() => "extra footer"}
              />
            </div>
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
