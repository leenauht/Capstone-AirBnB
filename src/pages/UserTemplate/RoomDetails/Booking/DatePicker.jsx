import "dayjs/locale/vi"; // ✅ Import ngôn ngữ tiếng Việt
import locale from "antd/es/date-picker/locale/vi_VN"; // ✅ Dùng locale của antd
import dayjs from "dayjs";
import { Button, DatePicker } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange } from "../sliceRoomDetail";

export default function SelectDatePicker(props) {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const { dateRange, diffDays } = useSelector(
    (state) => state.roomDetailReducer
  );
  const valuesDate = dateRange.map((day) => dayjs(day));

  const dateInfo = useMemo(() => {
    if (!valuesDate || valuesDate.length < 2) {
      return undefined;
    } else {
      const [startDate, endDate] = valuesDate;
      return {
        fromData: startDate.format("DD/MM/YYYY"),
        toData: endDate.format("DD/MM/YYYY"),
      };
    }
  }, [valuesDate]);

  const pickerRef = useRef(null);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const handleOnChange = (values) => {
    const [startDate, endDate] = values;
    dispatch(setDateRange([startDate.valueOf(), endDate.valueOf()]));
  };

  const handleDeleteDay = () => {
    dispatch(setDateRange([]));
  };

  const [dropdownClass, setDropdownClass] = useState(
    "one-month-picker no-prev-btn"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDropdownClass("");
      } else {
        setDropdownClass("one-month-picker no-prev-btn");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <RangePicker
      value={valuesDate}
      ref={pickerRef}
      open={props.open}
      onOpenChange={(open) => props.setOpen(open)}
      onChange={handleOnChange}
      locale={locale}
      allowClear={false}
      disabledDate={disabledDate}
      popupClassName={dropdownClass}
      variant="borderless"
      className="text-gray-500 w-full px-4 pt-0 pb-4 !z-50 font-medium placeholder:text-base border-none active:border-none"
      placeholder="Thêm ngày"
      format="DD/MM/YYYY"
      suffixIcon={null}
      separator={null}
      panelRender={(panelNode) => (
        <div className="!w-full">
          <div className="">
            {!dateInfo ? (
              <div className="p-5 font-bold flex gap-2">
                <p>Chọn ngày</p>-<p>Thêm ngày đi</p>
              </div>
            ) : (
              <div className="p-5 font-bold flex gap-1.5">
                <p>{diffDays} đêm</p>-
                <p>
                  {dateInfo.fromData} - {dateInfo.toData}
                </p>
              </div>
            )}

            {panelNode}
          </div>
        </div>
      )}
      renderExtraFooter={() => (
        <div className="flex justify-end gap-2 px-3 py-5">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteDay();
            }}
            type="primary"
          >
            Xóa ngày
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              props.setOpen(false);
            }}
            type="primary"
            danger
          >
            Xác nhận
          </Button>
        </div>
      )}
    />
  );
}
