import { DatePicker, Form, Input, Radio, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function UpdateUserForm(props) {
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "",
  });

  const handleSubmitEditUser = () => {
    form
      .validateFields()
      .then(async (values) => {
        const result = await api.put(`/users/${props.userInfo.id}`, values);
        if (!result) return;
        props.setOpen(false);
        toast.success("Cập nhật thông tin thanh công!", { autoClose: 2000 });
        const newData = { ...props.userInfo, ...result.content };
        localStorage.setItem("userInfo", JSON.stringify(newData));
        props.setUserInfo(newData);
      })
      .catch((error) => {
        const messageError = error.response.data.content;
        toast.error(messageError);
      });
  };

  useEffect(() => {
    const { name, email, phone, birthday, gender, role } = props.userInfo;
    setUser({
      name: name,
      email: email,
      phone: phone,
      birthday: dayjs(birthday),
      gender: `${gender}`,
      role: role?.toLowerCase(),
    });
  }, [props.userInfo]);

  return (
    <>
      <Modal
        open={props.open}
        title={
          <div className="text-center text-xl font-medium w-full pb-5">
            Chỉnh sửa thông tin
          </div>
        }
        onCancel={() => {
          props.setOpen(false);
          form.resetFields();
        }}
        footer={<></>}
      >
        <Form initialValues={user} form={form}>
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
            <Radio.Group value={user.gender}>
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
            <DatePicker value={user.birthday} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            labelCol={{ span: 5 }}
            rules={[{ required: true, message: "Vui lòng chọn một tùy chọn!" }]}
          >
            <Radio.Group value={user.role}>
              <Radio value="admin"> Admin </Radio>
              <Radio value="user"> User </Radio>
            </Radio.Group>
          </Form.Item>

          <div className="flex justify-end pt-5">
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmitEditUser}
            >
              Cập nhật thông tin
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
