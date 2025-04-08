import { NavLink } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function PageNotPound() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen w-screen">
      <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" />
      <p className="text-4xl font-medium">Page Not Pound</p>
      <p>Không tìm thấy trang</p>
      <NavLink
        to="/"
        className="text-black hover:text-blue-500 transition duration-300"
      >
        <Button type="primary">
          <HomeOutlined />
          <span>Quay về trang chủ</span>
        </Button>
      </NavLink>
    </div>
  );
}
