import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  Upload,
  message,
  Radio,
  DatePicker,
  Select,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateUser, uploadAvatar } from "../UserList/slice";
import dayjs from "dayjs";

const UserInfoPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [localUserInfo, setLocalUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromLocalStorage = JSON.parse(
      localStorage.getItem("userInfo")
    );
    if (userInfoFromLocalStorage) {
      setLocalUserInfo(userInfoFromLocalStorage);
      form.setFieldsValue({
        name: userInfoFromLocalStorage?.name,
        email: userInfoFromLocalStorage?.email,
        phone: userInfoFromLocalStorage?.phone,
        birthday: userInfoFromLocalStorage?.birthday
          ? dayjs(userInfoFromLocalStorage?.birthday)
          : null,
        gender: userInfoFromLocalStorage?.gender,
        role: userInfoFromLocalStorage?.role,
      });
    }
  }, [form]);

  const handleAvatarChange = async ({ file }) => {
    if (!file) {
      message.error("Không có tệp để tải lên!");
      return;
    }

    try {
      // Gọi API upload ảnh
      const response = await dispatch(uploadAvatar(file)).unwrap();

      // Kiểm tra nếu avatar có tồn tại trong response.content
      if (response?.content?.avatar) {
        const newAvatar = response.content.avatar;

        const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!currentUserInfo) {
          throw new Error(
            "Không tìm thấy dữ liệu người dùng trong localStorage."
          );
        }

        // Cập nhật avatar mới vào thông tin người dùng
        const updatedUserInfo = {
          ...currentUserInfo,
          avatar: newAvatar, // Cập nhật avatar mới
        };

        // Lưu lại thông tin người dùng đã cập nhật vào localStorage
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

        // Cập nhật lại trạng thái trong ứng dụng
        setLocalUserInfo(updatedUserInfo);

        // Thông báo thành công
        message.success("Cập nhật avatar thành công!");
      } else {
        // Nếu không có avatar trong response.content
        const errorMessage = `Lỗi: Không nhận được URL ảnh từ API. Dữ liệu trả về: ${JSON.stringify(
          response
        )}`;
        console.error("🚨 Lỗi API: ", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Xử lý lỗi upload ảnh
      console.error("🚨 Lỗi upload ảnh:", error?.message || error);
      message.error(error?.message || "Lỗi khi tải ảnh lên!");
    }
  };

  const handleSubmit = (values) => {
    const userData = {
      ...values,
      id: localUserInfo?.id,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : "",
      avatar: localUserInfo?.avatar,
    };

    dispatch(updateUser(userData));
    message.success("Cập nhật thông tin thành công!");

    const updatedUserInfo = { ...localUserInfo, ...userData };
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    setLocalUserInfo(updatedUserInfo);
  };

  if (!localUserInfo) return <div>Đang tải thông tin người dùng...</div>;

  return (
    <div>
      <h1>Thông Tin Cá Nhân</h1>

      <Avatar
        src={localUserInfo?.avatar || undefined}
        icon={!localUserInfo?.avatar && <UserOutlined />}
        size={64}
      />
      <Upload
        beforeUpload={() => false}
        showUploadList={false}
        onChange={handleAvatarChange}
      >
        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
      </Upload>

      <Form form={form} onFinish={handleSubmit} style={{ marginTop: "20px" }}>
        <Form.Item
          name="name"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Vui lòng nhập email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="birthday" label="Ngày sinh">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính">
          <Radio.Group>
            <Radio value={true}>Nam</Radio>
            <Radio value={false}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="role" label="Vai trò">
          <Select disabled={localUserInfo?.role === "ADMIN"}>
            <Select.Option value="USER">USER</Select.Option>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Lưu thay đổi
        </Button>
      </Form>
    </div>
  );
};

export default UserInfoPage;
