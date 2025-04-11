import { useState } from "react";
import Payment from "../../../../Icons/Payment";
import { List } from "antd";

export default function PaymentAndSettlement() {
  const data = [
    {
      id: 1,
      title: "Thanh toán",
    },
    {
      id: 2,
      title: "Chi trả",
    },
  ];
  const [itemSlected, setItemSelected] = useState(data[0]);
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
      {/* Left Panel */}
      <div className="p-5 rounded-xl w-full lg:w-3/5">
        <div>
          <List
            className="relative"
            grid={{ gutter: 16, column: 2 }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  onClick={() => setItemSelected(item)}
                  className="cursor-pointer"
                  title={
                    <span
                      className={`${
                        itemSlected.id === item.id
                          ? "black border-b-2 border-red-500 w-full"
                          : "text-gray-500"
                      } text-xl font-bold`}
                    >
                      {item.title}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </div>

        <hr />

        {itemSlected.id === 1 && (
          <div className="pt-5 space-y-10">
            <div>
              <h3 className="text-2xl font-medium">Cách bạn nhận chi trả</h3>
              <p>
                Thêm ít nhất một phương thức chi trả để chúng tôi biết nên gửi
                tiền cho bạn về đâu.
              </p>
            </div>
            <div>
              <button className="bg-black py-3 px-5 rounded-lg text-white font-medium">
                Thiết lập khoản chi trả
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-medium">Phương thức thanh toán</h3>
              <p>
                Thêm phương thức thanh toán bằng hệ thống thanh toán an toàn của
                chúng tôi, sau đó bắt đầu lập kế hoạch cho chuyến đi tiếp theo
                của bạn.
              </p>
            </div>

            <hr />

            <div>
              <button className="bg-black py-3 px-5 rounded-lg text-white font-medium">
                Thêm phương thức thanh toán
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-medium">
                Điểm tích lũy quà tặng của Airbnb
              </h3>
            </div>
            <div>
              <button className="bg-black py-3 px-5 rounded-lg text-white font-medium">
                Thêm thẻ quà tặng
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-medium">Phiếu giảm giá</h3>
            </div>

            <hr />

            <div className="flex justify-between">
              <p>Phiếu giảm giá của bạn</p>
              <span>0</span>
            </div>
            <div>
              <button className="bg-black py-3 px-5 rounded-lg text-white font-medium">
                Thêm phiếu giảm giá
              </button>
            </div>
          </div>
        )}

        {itemSlected.id === 2 && (
          <div className="pt-5 space-y-10">
            <div>
              <h3 className="text-2xl font-medium">Cách bạn nhận chi trả</h3>
              <p>
                Thêm ít nhất một phương thức chi trả để chúng tôi biết nên gửi
                tiền cho bạn về đâu.
              </p>
            </div>
            <div>
              <button className="bg-black py-3 px-5 rounded-lg text-white font-medium">
                Thiết lập khoản chi trả
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-2/5 space-y-5 border p-5 h-fit rounded-xl">
        <Payment />

        <h3 className="text-lg font-bold">
          Thực hiện tất cả các thanh toán qua Airbnb
        </h3>
        <p>
          <span>
            Luôn thanh toán và liên lạc qua Airbnb để đảm bảo bạn được bảo vệ
            theo
          </span>{" "}
          <a className="underline font-medium" href="#">
            Điều khoản dịch vụ
          </a>
          {", "}
          <a className="underline font-medium" href="#">
            Điều khoản dịch vụ thanh toán
          </a>
          {", "}
          <span>
            chính sách hủy và các biện pháp bảo vệ khác của chúng tôi.
          </span>{" "}
          <a className="underline font-medium" href="#">
            Tìm hiểu thêm
          </a>
        </p>
      </div>
    </div>
  );
}
