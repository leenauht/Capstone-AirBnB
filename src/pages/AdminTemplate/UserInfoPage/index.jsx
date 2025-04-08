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
  Row,
  Col,
  Typography,
  Card,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateUser, uploadAvatar } from "../UserList/slice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const UserInfoPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
      const response = await dispatch(uploadAvatar(file)).unwrap();

      if (response?.avatar) {
        const newAvatar = response.avatar;
        const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!currentUserInfo) {
          throw new Error(
            "Không tìm thấy dữ liệu người dùng trong localStorage."
          );
        }

        const updatedUserInfo = { ...currentUserInfo, avatar: newAvatar };

        // Cập nhật thông tin avatar vào localStorage mà không thay đổi các thông tin khác
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

        // Cập nhật trạng thái trong ứng dụng
        setLocalUserInfo(updatedUserInfo);

        message.success("Cập nhật avatar thành công!");
        window.location.reload();
      } else {
        throw new Error("Lỗi: Không nhận được URL ảnh từ API");
      }
    } catch (error) {
      console.error(
        "Lỗi upload ảnh từ handleAvatarChange:",
        error?.message || error
      );
      message.error(error?.message || "Lỗi khi tải ảnh lên!");
    }
  };

  const handleSubmit = (values) => {
    const userData = {
      ...values,
      id: localUserInfo?.id,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : "",
      avatar: localUserInfo?.avatar, // Giữ nguyên avatar
      password: values.password ? values.password : localUserInfo?.password,
    };

    dispatch(updateUser(userData));
    message.success("Cập nhật thông tin thành công!");

    const updatedUserInfo = { ...localUserInfo, ...userData };
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    setLocalUserInfo(updatedUserInfo);
  };

  if (!localUserInfo) return <div>Đang tải thông tin người dùng...</div>;

  return (
    <div style={{ padding: "10px", maxWidth: "900px", margin: "0 auto" }}>
      <Card
        style={{
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          padding: "10px",
          border: "none",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Thông Tin Cá Nhân
        </Title>
        <Row gutter={[24, 24]}>
          {/* Phần Avatar */}
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <Avatar
              src={localUserInfo?.avatar || undefined}
              icon={!localUserInfo?.avatar && <UserOutlined />}
              size={150}
              style={{
                marginBottom: "14px",
                border: "4px solid #1890ff",
                borderRadius: "50%",
                backgroundColor: "#87d068",
              }}
            />
            <Upload
              beforeUpload={() => false}
              showUploadList={false}
              onChange={handleAvatarChange}
            >
              <Button icon={<UploadOutlined />} style={{ marginTop: "10px" }}>
                Tải ảnh lên
              </Button>
            </Upload>
          </Col>
          {/* Phần Form thông tin cá nhân */}
          <Col xs={24} md={16}>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                  >
                    <Input size="large" placeholder="Nhập tên của bạn" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      {
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email không hợp lệ",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item name="password" label="Mật khẩu" hasFeedback>
                    <Input.Password size="large" placeholder="Nhập mật khẩu" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                      {
                        pattern: /^0\d{9}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item name="birthday" label="Ngày sinh">
                    <DatePicker
                      size="large"
                      format="YYYY-MM-DD"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="gender" label="Giới tính">
                    <Radio.Group>
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="role" label="Vai trò">
                <Select
                  disabled={localUserInfo?.role === "ADMIN"}
                  size="large"
                  placeholder="Chọn vai trò"
                >
                  <Select.Option value="USER">USER</Select.Option>
                  <Select.Option value="ADMIN">ADMIN</Select.Option>
                </Select>
              </Form.Item>

              <Row justify="space-between">
                <Col>
                  <Button type="primary" htmlType="submit" size="large">
                    Lưu thay đổi
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    danger
                    size="large"
                    onClick={() => navigate("/admin/QuanLyNguoiDung/1")}
                  >
                    Quay lại danh sách
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserInfoPage;
