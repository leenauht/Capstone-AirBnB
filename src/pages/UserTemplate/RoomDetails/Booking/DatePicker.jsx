import "dayjs/locale/vi"; // ✅ Import ngôn ngữ tiếng Việt
import locale from "antd/es/date-picker/locale/vi_VN"; // ✅ Dùng locale của antd
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useRef, useState } from "react";

export default function SelectDatePicker(props) {
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState([]);
  const [diffDays, setDiffDays] = useState(0);
  const pickerRef = useRef(null);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const handleOnChange = (values) => {
    if (values && values.length === 2) {
      const startDate = values[0];
      const endDate = values[1];
      const difference = endDate.diff(startDate, "day");

      setDates([startDate.format("DD/MM/YYYY"), endDate.format("DD/MM/YYYY")]);
      setDiffDays(difference);
      props.setOpen();
    }
  };

  return (
    <div className="flex px-4 pb-4">
      <RangePicker
        ref={pickerRef}
        open={props.open}
        onOpenChange={props.setOpen}
        onChange={handleOnChange}
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
            {dates.length === 2 && (
              <div className="p-5 font-bold flex gap-10">
                <p>{diffDays} đêm</p>/
                <p>
                  {dates[0]} - {dates[1]}
                </p>
              </div>
            )}

            {panelNode}
          </div>
        )}
        renderExtraFooter={() => "extra footer"}
      />
    </div>
  );
}
