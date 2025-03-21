import { Card, List } from "antd";
import { useState } from "react";
import { data } from "./data";

export default function Account() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="pt-[160px] container mx-auto">
      <h2 className="text-3xl font-bold pb-10">Tài khoản</h2>
      <div className="flex gap-10">
        <div className="w-1/3">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer"
                  title={
                    <p
                      className={`${
                        activeIndex === index ? "black" : "text-gray-500"
                      } text-lg font-medium`}
                    >
                      {item.title}
                    </p>
                  }
                  description={`${item.description ? item.description : ""}`}
                />
              </List.Item>
            )}
          />
        </div>

        <div className="flex-1">
          <p>{data[activeIndex].content}</p>
        </div>
      </div>
    </div>
  );
}
