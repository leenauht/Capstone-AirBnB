import { Button, Dropdown, Menu, Popover } from "antd";
import Subtract from "../../../../Icons/Subtract";
import Add from "../../../../Icons/Add";
import { dataMenuDropdown } from "./dataMenuDropdown";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DropdownBooking() {
  const [data, setData] = useState(dataMenuDropdown);
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(1);
  const maxGuest = 4;

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleOnclickAdd = (id) => {
    if (count >= maxGuest) {
      toast.error(`Số khách tối đa là ${maxGuest}!`, { autoClose: 2000 });
      return;
    }
    if (id === 4) return;
    const newData = data.map((item) =>
      item.id === id ? { ...item, numberOfGuest: item.numberOfGuest + 1 } : item
    );
    console.log(newData);
    setCount(count + 1);
    return setData(newData);
  };

  const handleOnclickSubtract = (id) => {
    if (id === 1 && data[0].numberOfGuest === 1) return;
    if (id > 1 && data[id - 1].numberOfGuest === 0) return;
    const newData = data.map((item) =>
      item.id === id ? { ...item, numberOfGuest: item.numberOfGuest - 1 } : item
    );
    console.log(newData);
    setCount(count - 1);

    return setData(newData);
  };

  const renderContent = () => {
    return (
      <div className="space-y-4 py-4 max-w-[330px] whitespace-nowrap">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="hover:!bg-transparent !cursor-default"
            >
              <div className="flex justify-between items-center">
                <div className="w-2/3">
                  <h4 className="text-lg font-medium">{item.title}</h4>
                  <p
                    className={`${
                      item.id === 4 ? "underline font-medium" : ""
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 w-1/3">
                  <button
                    onClick={() => {
                      handleOnclickSubtract(item.id);
                    }}
                    className={`${
                      item.id === 1 && item.numberOfGuest > 1
                        ? "!cursor-pointer hover:border-gray-900"
                        : item.id > 1 && item.id < 4 && item.numberOfGuest > 0
                        ? "!cursor-pointer hover:border-gray-900"
                        : ""
                    } border-[1px] rounded-full p-2 cursor-not-allowed`}
                  >
                    <Subtract />
                  </button>
                  <p>{item.numberOfGuest}</p>
                  <button
                    onClick={
                      item.pet === false
                        ? undefined
                        : () => {
                            handleOnclickAdd(item.id);
                          }
                    }
                    className={`${
                      item.id !== 4
                        ? "hover:border-gray-900 border-gray-400 !cursor-pointer"
                        : ""
                    }  border-[1px] rounded-full p-2 cursor-not-allowed`}
                  >
                    <Add />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <p className="text-[13px] whitespace-normal">
            Chỗ ở này cho phép tối đa <span>{maxGuest}</span> khách, không tính
            em bé. Không được phép mang theo thú cưng.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={hide}>Đóng</Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Popover
        className="cursor-pointer"
        content={renderContent}
        title=""
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div className="flex justify-between border-transparent border p-4 hover:border hover:border-black hover:rounded-xl">
          <div className="leading-snug">
            <p className="font-bold text-xs leading-3 uppercase">Khách</p>
            <p className="text-sm">{count} khách</p>
          </div>
          <DownOutlined />
        </div>
      </Popover>
    </>
  );
}
