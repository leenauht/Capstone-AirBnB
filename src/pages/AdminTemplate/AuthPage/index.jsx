import { useEffect, useRef } from "react";
import { actLogin } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { toast, ToastContainer } from "react-toastify";
import Logo from "../../../Icons/Logo";

export default function AuthPage() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const errorToastShown = useRef(false);

  const handleLogin = async (values) => {
    try {
      await dispatch(actLogin(values)).unwrap();
      errorToastShown.current = false;
      toast.success("Đăng nhập thành công!", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
      });
      // Chuyển hướng sau khi đăng nhập thành công
      setTimeout(() => {
        navigate("/admin/QuanLyNguoiDung/1", { replace: true });
      }, 1000);
    } catch (error) {
      toast.error(error || "Đăng nhập thất bại!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      if (error === "Bạn không có quyền truy cập trang này.") {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (
      state.data &&
      state.data.userInfo &&
      state.data.userInfo.role.toUpperCase() !== "USER"
    ) {
      if (location.pathname === "/auth") {
        navigate("/admin/QuanLyNguoiDung/1", { replace: true });
      }
    }
  }, [state.data, location.pathname, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Cột trái - Ảnh nền + Chữ billboard */}
      <div className="hidden md:flex w-3/5 relative">
        <img
          src="public/image/airbnb-background.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Logo ở góc trên bên trái */}
        <div className="absolute top-8 left-8">
          <Logo width={150} height={150} color="#FF385C" />
        </div>
        {/* Khối chữ đặt chồng lên ảnh */}
        <div className="absolute text-white left-8 bottom-8 max-w-md">
          <Typography.Title
            level={3}
            style={{ color: "#fff", marginBottom: "8px" }}
          >
            We believe in a world where people belong, anywhere.
          </Typography.Title>
          <p className="text-white text-sm">Airbnb Clone - MeiCloudie</p>
        </div>
      </div>

      {/* Cột phải - Form đăng nhập */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-6 bg-white">
        <div
          className="w-full max-w-md shadow-lg rounded-lg"
          style={{ padding: "50px", minHeight: "500px" }}
        >
          <Typography.Title
            level={2}
            className="text-center font-bold text-xl"
            style={{ marginBottom: "30px" }}
          >
            Đăng Nhập
          </Typography.Title>
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={handleLogin}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
              style={{ marginBottom: "24px", fontWeight: "italic" }}
            >
              <Input
                placeholder="Nhập Email"
                style={{ borderRadius: "8px", height: "45px", width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              style={{ marginBottom: "24px", fontWeight: "italic" }}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                style={{ borderRadius: "8px", height: "45px", width: "100%" }}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "16px" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  width: "100%",
                  backgroundColor: "#FF385C",
                  borderColor: "#FF385C",
                  fontSize: "16px",
                }}
                block
              >
                Tiếp Tục
              </Button>
            </Form.Item>
            {/* Dòng dưới nút đăng nhập */}
            <div className="text-center mt-4">
              <span>Bạn chưa có tài khoản? </span>
              <a
                href="/"
                className="text-[#FF385C] hover:text-[#FF385C] hover:underline hover:underline-offset-2"
              >
                Trang chủ
              </a>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
