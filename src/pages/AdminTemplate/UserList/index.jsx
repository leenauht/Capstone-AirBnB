import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setPagination,
  deleteUser,
  addUser,
  updateUser,
} from "./slice";
import {
  Table,
  Input,
  Pagination,
  Skeleton,
  Tag,
  Card,
  Space,
  Button,
  Popconfirm,
  Typography,
  Row,
  Col,
  Modal,
  Avatar,
  Divider,
  Descriptions,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  InfoCircleOutlined,
  SafetyOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import CustomFormModal from "../_component/CustomFormModal";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import * as Yup from "yup";
import debounce from "lodash/debounce";
import { useNavigate, useParams } from "react-router-dom";

export default function UserList() {
  const dispatch = useDispatch();
  const { pageIndex } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, pagination } = useSelector(
    (state) => state.userReducer
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Title, Text } = Typography;

  useEffect(() => {
    const currentPage = Number(pageIndex) || 1;
    dispatch(setPagination({ pageIndex: currentPage }));
    dispatch(
      fetchUsers({
        pageIndex: currentPage,
        pageSize: pagination.pageSize,
        search: searchTerm,
      })
    );
  }, [dispatch, pageIndex, pagination.pageSize, searchTerm]);

  const showDetail = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setIsFormModalOpen(false);
  };

  const debouncedSearch = useRef(
    debounce((value) => {
      dispatch(setPagination({ pageIndex: 1 }));
      dispatch(
        fetchUsers({
          pageIndex: 1,
          pageSize: pagination.pageSize,
          search: value,
        })
      );
    }, 500)
  ).current;

  const handleSearch = (value) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleOpenModal = (mode, user = null) => {
    setFormMode(mode);
    setSelectedUser(mode === "edit" ? user : null);
    setIsFormModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      const updatedValues = { ...values };

      if (!updatedValues.password) delete updatedValues.password;
      if (formMode === "edit" && selectedUser?.id) {
        updatedValues.id = selectedUser.id;
        await dispatch(updateUser(updatedValues)).unwrap();
        toast.success(`Cập nhật ${values.name} thành công!`);
      } else {
        await dispatch(addUser(updatedValues)).unwrap();
        toast.success(`Thêm người dùng ${values.name} thành công!`);
      }

      dispatch(fetchUsers(pagination));
      setIsFormModalOpen(false);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("❌ Lỗi khi xử lý thông tin người dùng!");
    }
  };

  const handleDelete = useCallback(
    async (userId) => {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        toast.success(`Xóa người dùng ID ${userId} thành công!`);

        const currentPage = Number(pageIndex) || pagination.pageIndex;

        dispatch(
          fetchUsers({
            search: searchTerm,
            pageIndex: currentPage,
            pageSize: pagination.pageSize,
          })
        );
      } catch {
        toast.error("❌ Lỗi khi xóa người dùng!");
      }
    },
    [dispatch, pageIndex, pagination.pageIndex, pagination.pageSize, searchTerm]
  );

  const genderLabel = selectedUser?.gender ? "Nam" : "Nữ";
  const genderColor = selectedUser?.gender ? "blue" : "pink";

  const roleLabel = selectedUser?.role === "ADMIN" ? "Admin" : "User";
  const roleColor = selectedUser?.role === "ADMIN" ? "volcano" : "green";

  const userFields = [
    { name: "name", label: "Tài khoản", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Mật khẩu", type: "password" },
    { name: "phone", label: "Số điện thoại", type: "text" },
    { name: "birthday", label: "Ngày sinh", type: "date" },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      options: [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
      ],
    },
    {
      name: "gender",
      label: "Giới tính",
      type: "radio",
      options: [
        { value: true, label: "Nam" },
        { value: false, label: "Nữ" },
      ],
    },
  ];

  const getInitialValues = (user) => ({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    phone: user?.phone || "",
    birthday: selectedUser?.birthday ? dayjs(selectedUser.birthday) : null,
    gender: user?.gender ?? true,
    role: user?.role || "USER",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Tài khoản phải có ít nhất 3 ký tự!")
      .required("Tên tài khoản không được để trống!"),
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email!"),
    phone: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số!")
      .required("Vui lòng nhập số điện thoại!"),
    birthday: Yup.date().required("Vui lòng chọn ngày sinh!"),
    gender: Yup.boolean().required("Vui lòng chọn giới tính!"),
    role: Yup.string().required("Vui lòng chọn vai trò!"),
  });

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Tài khoản", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      {
        title: "Hình Ảnh",
        dataIndex: "avatar",
        key: "avatar",
        render: (avatar) =>
          avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<span class="user-avatar-icon"><i class="anticon anticon-user"></i></span>`;
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #1890ff",
              }}
            />
          ) : (
            <Avatar
              icon={<UserOutlined />}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #1890ff",
                backgroundColor: "#87d068",
              }}
            />
          ),
      },

      {
        title: "Vai trò",
        dataIndex: "role",
        key: "role",
        render: (role) => {
          const roleColor = role === "ADMIN" ? "volcano" : "green";
          return <Tag color={roleColor}>{role.toUpperCase()}</Tag>;
        },
      },
      {
        title: "Hành động",
        key: "action",
        width: 240,
        render: (_, record) => (
          <Space.Compact>
            <Button
              color="purple"
              variant="solid"
              size="small"
              icon={<InfoCircleOutlined />}
              style={{ marginRight: 5 }}
              onClick={() => showDetail(record)}
            >
              Chi tiết
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleOpenModal("edit", record)}
              size="small"
              style={{ marginRight: 5 }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => handleDelete(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size="small"
              >
                Xóa
              </Button>
            </Popconfirm>
          </Space.Compact>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <div>
      <Row justify="center">
        <Col>
          <Title
            level={2}
            style={{
              fontWeight: "bold",
              marginBottom: 16,
              paddingBottom: 8,
              borderBottom: "3px solid #800080",
              display: "inline-block",
            }}
          >
            🛠️ Quản lý người dùng
          </Title>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input.Search
            placeholder="🔍 Tìm kiếm theo tên ..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            enterButton="Tìm kiếm"
            size="large"
          />
        </Col>
        <Col>
          <Button
            color="cyan"
            variant="solid"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => handleOpenModal("add")}
          >
            Thêm người dùng
          </Button>
        </Col>
      </Row>
      {loading ? (
        <>
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 5 }} />
        </>
      ) : (
        <>
          <Table
            dataSource={Array.isArray(data) ? data : []}
            rowKey="id"
            columns={columns}
            pagination={false}
            scroll={{ y: 500 }}
            style={{ marginBottom: 10 }}
            loading={loading}
          />
          <Pagination
            current={pagination.pageIndex}
            total={pagination.totalRow}
            pageSize={pagination.pageSize}
            showSizeChanger
            onChange={(page) => {
              dispatch(setPagination({ pageIndex: page }));
              navigate(`/admin/QuanLyNguoiDung/${page}`);
            }}
          />
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            Thông tin người dùng (ID: {selectedUser?.id})
          </Title>
        }
        open={isModalOpen}
        onCancel={handleClose}
        footer={<Button onClick={handleClose}>Đóng</Button>}
        centered
        width={700}
      >
        {selectedUser && (
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Row gutter={[24, 24]} align="middle">
              {/* Cột Avatar + Role */}
              <Col
                span={8}
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    border: "3px solid #1890ff",
                    backgroundColor: "#87d068",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    color: "#fff",
                    overflow: "hidden",
                  }}
                >
                  {selectedUser.avatar ? (
                    <img
                      src={selectedUser.avatar}
                      alt="Avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none"; // Ẩn ảnh bị lỗi
                        e.target.parentNode.innerHTML = `
                        <span style="font-size: 50px; color: #fff;">
                          <i class="anticon anticon-user"></i>
                        </span>
                      `;
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <UserOutlined style={{ fontSize: 50, color: "#fff" }} />
                  )}
                </div>

                {/* Role */}
                <div>
                  <Text strong style={{ fontSize: 16 }}>
                    Vai trò:
                  </Text>
                  <br />
                  <Tag
                    color={roleColor}
                    icon={<SafetyOutlined />}
                    style={{ fontSize: 14, padding: "4px 8px" }}
                  >
                    {roleLabel}
                  </Tag>
                </div>
              </Col>

              {/* Cột Thông tin chi tiết */}
              <Col span={16}>
                <Descriptions
                  bordered
                  size="middle"
                  column={1}
                  styles={{
                    label: {
                      width: "160px",
                      fontWeight: "bold",
                      fontSize: 16,
                    },
                    content: {
                      fontSize: 16,
                    },
                  }}
                >
                  <Descriptions.Item
                    label={
                      <span>
                        <UserOutlined
                          style={{ marginRight: 8, color: "#1890ff" }}
                        />
                        Tên
                      </span>
                    }
                  >
                    {selectedUser.name}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <MailOutlined
                          style={{ marginRight: 8, color: "#1890ff" }}
                        />
                        Email
                      </span>
                    }
                  >
                    {selectedUser.email}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <PhoneOutlined
                          style={{ marginRight: 8, color: "#1890ff" }}
                        />
                        Điện thoại
                      </span>
                    }
                  >
                    {selectedUser.phone}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <CalendarOutlined
                          style={{ marginRight: 8, color: "#1890ff" }}
                        />
                        Ngày sinh
                      </span>
                    }
                  >
                    {selectedUser.birthday
                      ? dayjs(selectedUser.birthday).format("DD/MM/YYYY")
                      : "Không có"}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        {genderLabel === "Nam" ? (
                          <ManOutlined
                            style={{ marginRight: 8, color: genderColor }}
                          />
                        ) : (
                          <WomanOutlined
                            style={{ marginRight: 8, color: genderColor }}
                          />
                        )}
                        Giới tính
                      </span>
                    }
                  >
                    <Tag color={genderColor} style={{ fontSize: 14 }}>
                      {genderLabel}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        )}
      </Modal>

      <CustomFormModal
        visible={isFormModalOpen}
        onCancel={() => setIsFormModalOpen(false)}
        onSubmit={handleSubmit}
        title={formMode === "add" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
        fields={userFields}
        initialValues={getInitialValues(selectedUser)}
        validationSchema={validationSchema}
        formMode={formMode}
      />
    </div>
  );
}
