import { List, Switch } from "antd";
import { useState } from "react";
import ChevronRight from "./../../../../Icons/ChevronRight";

export default function PrivacyAndSharing() {
  const data = [
    {
      id: 1,
      title: "Dữ liệu",
    },
    {
      id: 2,
      title: "Chia sẻ",
    },
    {
      id: 3,
      title: "Dịch vụ",
    },
  ];
  const [itemSlected, setItemSelected] = useState(data[0]);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="flex gap-10">
      <div className="w-3/5">
        <div>
          <List
            className="relative"
            grid={{ gutter: 16, column: 3 }} // Hiển thị theo hàng ngang (4 cột)
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
          <div className="space-y-14 pt-5">
            <h4 className="text-2xl font-medium">
              Quản lý dữ liệu tài khoản của bạn
            </h4>
            <div>
              <p className="flex gap-5 items-center text-lg">
                Yêu cầu dữ liệu cá nhân của bạn
                <span>
                  <ChevronRight />
                </span>
              </p>
              <p className="text-gray-600">
                Chúng tôi sẽ tạo tệp để bạn tải xuống dữ liệu cá nhân của mình.
              </p>
            </div>
            <div>
              <p className="flex gap-5 items-center text-lg">
                Xóa tài khoản của bạn
                <span>
                  <ChevronRight />
                </span>
              </p>
              <p className="text-gray-600">
                Hành động này sẽ xóa vĩnh viễn tài khoản và dữ liệu của bạn theo
                luật hiện hành.
              </p>
            </div>
          </div>
        )}

        {itemSlected.id === 2 && (
          <div className="pt-5 space-y-5">
            <div>
              <h4 className="text-2xl font-medium">Chia sẻ hoạt động</h4>
              <p className="text-gray-600">
                Chọn cách hiển thị hồ sơ và hoạt động của bạn cho người khác.
              </p>
            </div>

            <div>
              <p className="flex gap-5 items-center text-lg">
                Tính năng thông báo đã đọc tin nhắn
              </p>
              <p className="text-gray-600 pb-5">
                Khi bật tính năng này, chúng tôi sẽ cho mọi người biết là bạn đã
                đọc tin nhắn của họ.{" "}
                <a className="underline font-medium" href="#">
                  Tìm hiểu thêm
                </a>
              </p>
              <Switch defaultChecked onChange={onChange} />
            </div>
            <hr />
            <div>
              <h4 className="text-2xl font-medium">Đánh giá</h4>
              <p className="text-gray-600 pb-5">
                Chọn nội dung được chia sẻ khi bạn viết đánh giá. Khi cập nhật
                cài đặt này, nội dung hiển thị cho tất cả các đánh giá trước đây
                sẽ thay đổi.{" "}
                <a className="underline font-medium" href="#">
                  Tìm hiểu thêm
                </a>
              </p>
            </div>

            <div>
              <p className="flex gap-5 items-center text-lg">
                Hiển thị thời gian ở của tôi
              </p>
              <p className="text-gray-600 pb-5">
                Khi bật tính năng này, bài đánh giá của bạn có thể hiển thị thêm
                thông tin về thời gian ở ước tính (ví dụ: vài đêm, khoảng một
                tuần hoặc hơn một tuần).
              </p>
              <Switch defaultChecked onChange={onChange} />
            </div>
          </div>
        )}

        {itemSlected.id === 3 && (
          <div className="space-y-5 pt-5">
            <div>
              <h4 className="text-2xl font-medium">Dịch vụ đã liên kết</h4>
              <p className="text-gray-600">
                Xem các dịch vụ mà bạn đã liên kết với tài khoản Airbnb của mình
              </p>
            </div>
            <p>Hiện không có dịch vụ nào được liên kết</p>
          </div>
        )}
      </div>
      <div className="w-2/5 space-y-5 border p-5 h-fit rounded-xl">
        <h3 className="text-lg font-bold">Cam kết đảm bảo quyền riêng tư</h3>
        <p>
          Airbnb cam kết bảo vệ dữ liệu của bạn. Xem chi tiết trong{" "}
          <a className="underline font-medium" href="#">
            Chính sách quyền riêng tư
          </a>{" "}
          của chúng tôi.
        </p>
        <div>
          <a className="underline font-medium" href="#">
            Gửi phản hồi
          </a>
          <p>
            Chia sẻ ý kiến phản hồi về việc yêu cầu cung cấp dữ liệu cá nhân của
            bạn để giúp chúng tôi cải thiện trải nghiệm của bạn
          </p>
        </div>
      </div>
    </div>
  );
}
