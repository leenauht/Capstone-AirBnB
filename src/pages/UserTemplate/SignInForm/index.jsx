import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function SignInForm(props) {
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
        console.log("result", result.content.user);
        const userInfo = result.content.user;
        if (userInfo) {
          toast.success("Đăng nhập thành công!", { autoClose: 2000 });
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          Cookies.set("token", result.content.token);
        }
        props.setOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        const messageError = error.response.data.content;
        toast.error(messageError);
      });
  };

  return (
    <Modal
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
              message: "Khong hop le",
            },
          ]}
        >
          <Input value={user.email} />
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
          <Input.Password value={user.password} />
        </Form.Item>
        <p className="text-end text-sm text-blue-700">
          <span
            className="cursor-pointer"
            onClick={() => {
              props.setOpen(false);
              props.setIsOpenFormSignup(true);
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
