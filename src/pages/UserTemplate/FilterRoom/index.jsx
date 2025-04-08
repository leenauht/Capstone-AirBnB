import { Button, List, Modal, Slider } from "antd";
import Filter from "../../../Icons/Filter";
import { useState } from "react";
import { dataRoomAndBedroom } from "./dataRoomAndBedroom";
import Subtract from "../../../Icons/Subtract";
import Add from "../../../Icons/Add";
import { dataOptional, dataUtil } from "../RoomDetails/data";
import FavoriteIcon from "./../../../Icons/FavoriteIcon";

export default function FilterRoom() {
  const [dataRoom, setDataRoom] = useState(dataRoomAndBedroom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = [
    {
      id: 1,
      title: "Bất kỳ loại nào",
    },
    {
      id: 2,
      title: "Phòng",
    },
    {
      id: 3,
      title: "Toàn bộ nhà",
    },
  ];
  const [itemSlected, setItemSelected] = useState(data[0]);

  const handleOnclickAdd = (id) => {
    const newData = dataRoom.map((item) =>
      item.id === id ? { ...item, numberOfGuest: item.numberOfGuest + 1 } : item
    );
    return setDataRoom(newData);
  };

  const handleOnclickSubtract = (id) => {
    const newData = dataRoom.map((item) =>
      item.id === id ? { ...item, numberOfGuest: item.numberOfGuest - 1 } : item
    );
    return setDataRoom(newData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <span
        className="flex justify-center items-center gap-1.5 whitespace-nowrap cursor-pointer px-5 py-2 border border-gray-300 rounded-2xl"
        onClick={showModal}
      >
        <Filter />
        Bộ lọc
      </span>
      <Modal
        styles={{
          maxHeight: 400,
          overflowY: "auto",
          marginRight: "-10px",
        }}
        className="w-[90%] lg:!w-2/5"
        footer={<></>}
        title={
          <div className="text-center w-full text-2xl font-bold border-b pb-5">
            Bộ lọc
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <div>
          <div className="border-b">
            <p className="py-5 text-xl font-bold">Loại nơi ở</p>
            <List
              className="relative"
              grid={{ gutter: 16, column: 3 }}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    onClick={() => setItemSelected(item)}
                    className="cursor-pointer items-center justify-center"
                    title={
                      <p
                        className={`${
                          itemSlected.id === item.id
                            ? "black border-b-2 border-red-500 w-full"
                            : "text-gray-500"
                        } text-lg font-medium text-center`}
                      >
                        {item.title}
                      </p>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          <div className="border-b pb-5">
            <p className="pt-5 text-xl font-bold">Loại nơi ở</p>
            <p className="text-gray-500 pb-5">
              Giá theo đêm chưa bao gồm phí và thuế
            </p>

            <Slider
              range
              step={10}
              defaultValue={[20, 50]}
              className="w-[96%] mx-auto"
            />
            <div className="flex justify-between">
              <div className="flex flex-col justify-center items-center">
                <p>Tối thiểu</p>
                <p className="py-[15px] px-5 border leading-[18px] border-gray-300 rounded-full">
                  ₫100.000
                </p>
              </div>
              <div>
                <div className="flex flex-col justify-center items-center">
                  <p>Tối đa</p>
                  <p className="py-[15px] px-5 border leading-[18px] border-gray-300 rounded-full">
                    ₫10.000.000+
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b pb-5">
            <p className="pt-5 text-xl font-bold pb-5">Phòng và phòng ngủ</p>
            <div className="space-y-4">
              {dataRoom.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="hover:!bg-transparent !cursor-default"
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-2/3">
                        <h4 className="text-lg font-medium">{item.title}</h4>
                      </div>
                      <div className="flex items-center justify-end gap-3 w-1/3">
                        <button
                          onClick={() => handleOnclickSubtract(item.id)}
                          className={`${
                            item.numberOfGuest > 0
                              ? "!cursor-pointer hover:border-gray-900"
                              : "cursor-not-allowed"
                          } border-[1px] rounded-full p-2`}
                        >
                          <Subtract />
                        </button>
                        <p>{item.numberOfGuest}</p>
                        <button
                          onClick={() => handleOnclickAdd(item.id)}
                          className="hover:border-gray-900 border-gray-400 cursor-pointer border-[1px] rounded-full p-2"
                        >
                          <Add />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-b pb-5">
            <p className="py-5 text-xl font-bold">Tiện nghi</p>
            <div className="flex flex-wrap gap-2">
              {dataUtil.map(({ name, svg: Icon }) => {
                return (
                  <span
                    key={name}
                    className="flex items-center gap-2 py-[15px] px-5 border leading-[18px] border-gray-300 rounded-full"
                  >
                    <Icon />
                    {<span className="">{name}</span>}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="border-b pb-5">
            <p className="py-5 text-xl font-bold">Tùy chọn đặt phòng</p>
            <div className="flex flex-wrap gap-2">
              {dataOptional.map(({ name, svg: Icon }) => {
                return (
                  <span
                    key={name}
                    className="flex items-center gap-2 py-[15px] px-5 border leading-[18px] border-gray-300 rounded-full"
                  >
                    <Icon />
                    {<span className="">{name}</span>}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="border-b pb-5">
            <p className="py-5 text-xl font-bold">Chỗ ở nổi bật</p>
            <div className="p-4 border flex gap-5 rounded-xl">
              <button className="flex">
                <FavoriteIcon />
              </button>
              <div className="">
                <p>Được khách yêu thích</p>
                <p>Những ngôi nhà được yêu thích nhất trên Airbnb</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-5">
          <Button onClick={() => setIsModalOpen(false)}>Đóng</Button>
        </div>
      </Modal>
    </div>
  );
}
