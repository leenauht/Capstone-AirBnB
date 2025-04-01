import { useEffect } from "react";
import { actLogin } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { ToastContainer, toast } from "react-toastify";

export default function AuthPage() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    dispatch(actLogin(values));
  };

  useEffect(() => {
    if (state.data?.userInfo?.role === "USER") {
      toast.warning("Bạn không có quyền truy cập trang này!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [state.data]);

  useEffect(() => {
    if (state.data) {
      toast.success("Đăng nhập thành công!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  }, [state.data]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  }, [state.error]);

  if (state.data) {
    return <Navigate to="/admin/QuanLyNguoiDung" />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Cột trái - Ảnh nền */}
      <div className="hidden md:flex w-3/5">
        <img
          src="/images/bg-admin.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cột phải - Form đăng nhập */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-6">
        <div
          className="w-full max-w-md bg-white shadow-lg rounded-lg"
          style={{ padding: "50px", minHeight: "500px" }}
        >
          <Typography.Title level={2} className="text-center font-bold">
            ĐĂNG NHẬP
          </Typography.Title>
          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
              style={{ marginBottom: "24px" }}
            >
              <Input
                placeholder="Nhập Email"
                style={{ borderRadius: "8px", height: "45px" }}
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              style={{ marginBottom: "24px" }}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                style={{ borderRadius: "8px", height: "45px" }}
              />
            </Form.Item>

            <Form.Item className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                style={{ height: "40px" }}
                block
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
