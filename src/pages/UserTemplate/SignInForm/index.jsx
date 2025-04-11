import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../store/sliceUserInfo";
import { toastError, toastSuccess } from "../../../utils";

export default function SignInForm(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    form
      .validateFields()
      .then(async (values) => {
        const result = await api.post("/auth/signin", values);
        const userInfo = result.content.user;
        if (userInfo) {
          toastSuccess("Đăng nhập thành công!");
          dispatch(setUserInfo(userInfo));
          Cookies.set("token", result.content.token);
        }
        props.setOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        const messageError = error.response.data.content;
        toastError(messageError);
      });
  };

  return (
    <Modal
      maskClosable={true}
      open={props.open}
      title={
        <div style={{ textAlign: "center", width: "100%", marginBottom: 20 }}>
          Đăng nhập
        </div>
      }
      onCancel={() => {
        props.setOpen(false);
        form.resetFields();
      }}
      footer={null}
    >
      <Form form={form}>
        <Form.Item
          style={{ paddingBottom: 10 }}
          label="Email"
          name="email"
          labelCol={{ span: 5 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input value={user.email} placeholder="Nhập địa chỉ email của bạn" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          labelCol={{ span: 5 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập password!",
            },
          ]}
        >
          <Input.Password
            value={user.password}
            placeholder="Nhập mật khẩu của bạn của bạn"
          />
        </Form.Item>
        <p className="text-end text-sm text-blue-700">
          <span
            className="cursor-pointer underline"
            onClick={() => {
              props.setOpen(false);
              props.setIsOpenFormSignup(true);
              form.resetFields();
            }}
          >
            Đăng ký ngay
          </span>
        </p>
        <div className="flex justify-center pt-5">
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
