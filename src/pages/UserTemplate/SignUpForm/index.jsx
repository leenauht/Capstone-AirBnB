import { DatePicker, Form, Input, Radio, Modal, Button } from "antd";
import { useState } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../../utils";

export default function SignUpForm(props) {
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "",
  });

  const handleSubmitSignUp = () => {
    form
      .validateFields()
      .then(async (values) => {
        const result = await api.post("/auth/signup", values);
        if (result?.content) {
          toastSuccess("Đăng ký thành công!");
        }
        props.setOpen(false);
        props.setIsOpenFormSignin(true);
        form.resetFields();
      })
      .catch((error) => {
        const messageError = error.response.data.content;
        toastError(messageError);
      });
  };

  return (
    <>
      <Modal
        open={props.open}
        title={
          <div className="text-center text-xl font-medium w-full pb-5">
            Đăng ký
          </div>
        }
        onCancel={() => {
          props.setOpen(false);
          form.resetFields();
        }}
        footer={<></>}
      >
        <Form form={form}>
          <Form.Item
            label="Username"
            name="name"
            labelCol={{ span: 5 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập username!",
              },
            ]}
          >
            <Input value={user.name} />
          </Form.Item>

          <Form.Item
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
            <Input value={user.password} />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            labelCol={{ span: 5 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập phone!",
              },
            ]}
          >
            <Input value={user.phone} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            labelCol={{ span: 5 }}
            rules={[{ required: true, message: "Vui lòng chọn một tùy chọn!" }]}
          >
            <Radio.Group>
              <Radio value="true"> Nam </Radio>
              <Radio value="false"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            labelCol={{ span: 5 }}
            rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            labelCol={{ span: 5 }}
            rules={[{ required: true, message: "Vui lòng chọn một tùy chọn!" }]}
          >
            <Radio.Group>
              <Radio value="admin"> Admin </Radio>
              <Radio value="user"> User </Radio>
            </Radio.Group>
          </Form.Item>

          <p className="text-start text-sm text-blue-700">
            <span
              className="cursor-pointer underline"
              onClick={() => {
                props.setOpen(false);
                props.setIsOpenFormSignin(true);
              }}
            >
              Đăng nhập ngay
            </span>
          </p>

          <div className="flex justify-end pt-5">
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmitSignUp}
            >
              Đăng ký
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
