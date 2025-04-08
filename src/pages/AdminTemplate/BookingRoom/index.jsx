import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingRooms, addRoom, updateRoom, deleteRoom } from "./slice";
import { fetchAllUsers } from "../UserList/slice";
import { fetchAllRooms } from "../RoomManagement/slice";
import {
  Table,
  Skeleton,
  Alert,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Popconfirm,
  Space,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomFormModal from "../_component/CustomFormModal";
import * as Yup from "yup";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Search } = Input;

const BookingRoom = () => {
  const dispatch = useDispatch();
  const {
    bookingRooms,
    loading: roomsLoading,
    error,
  } = useSelector((state) => state.BookingRoomReducer);
  const userList = useSelector((state) => state.userReducer.data) || [];
  const roomList =
    useSelector((state) => state.RoomManagementReducer.data) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBookingRooms({ search: searchTerm }));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    dispatch(fetchAllRooms());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredBookingRooms = bookingRooms.filter((bookingRoom) => {
    const mp = bookingRoom.maPhong
      ? String(bookingRoom.maPhong).toLowerCase()
      : "";
    const mnguoiDung = bookingRoom.maNguoiDung
      ? String(bookingRoom.maNguoiDung).toLowerCase()
      : "";
    const term = searchTerm.toLowerCase();
    return mp.includes(term) || mnguoiDung.includes(term);
  });

  const handleFormSubmit = async (values) => {
    try {
      if (editData) {
        // Cập nhật phòng
        await dispatch(updateRoom({ id: editData.id, ...values })).unwrap();
        toast.success("Cập nhật phòng thành công");
        setEditData(null);
      } else {
        // Thêm phòng
        await dispatch(addRoom(values)).unwrap();
        toast.success("Thêm phòng thành công");
      }

      // Sau khi thêm/cập nhật, luôn fetch lại danh sách phòng
      dispatch(fetchBookingRooms({ search: searchTerm }));

      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(
        editData
          ? `❌ Cập nhật phòng thất bại: ${error}`
          : `❌ Thêm phòng thất bại: ${error}`
      );
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleEdit = (record) => {
    setEditData(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRoom(id)).unwrap();
      toast.success(`Xóa phòng thành công`);
      dispatch(fetchBookingRooms({ search: searchTerm }));
    } catch {
      toast.error("Xóa phòng thất bại");
    }
  };

  const userFields = [
    {
      name: "maPhong",
      label: "Mã phòng",
      type: "select",
      options: roomList.map((room) => ({
        label: `${room.id} - ${room.tenPhong}`,
        value: room.id,
      })),
    },
    {
      name: "maNguoiDung",
      label: "Mã người dùng",
      type: "select",
      options: userList.map((user) => ({
        label: `${user.id} - ${user.name}`,
        value: user.id,
      })),
    },
    { name: "ngayDen", label: "Ngày đến", type: "date" },
    { name: "ngayDi", label: "Ngày đi", type: "date" },
    { name: "soLuongKhach", label: "Số lượng khách", type: "text" },
  ];

  const initialValues = {
    maPhong: "",
    maNguoiDung: "",
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: "",
  };

  const validationSchema = Yup.object().shape({
    maPhong: Yup.string().required("Vui lòng nhập mã phòng"),
    maNguoiDung: Yup.string().required("Vui lòng nhập mã người dùng"),
    ngayDen: Yup.date().required("Vui lòng nhập ngày đến"),
    ngayDi: Yup.date().required("Vui lòng nhập ngày đi"),
    soLuongKhach: Yup.number().required("Vui lòng nhập số lượng khách"),
  });

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      render: (text, record) => (
        <span style={{ fontWeight: "bold", color: "#1890ff" }}>
          {record.id} - {record.tenPhong}
        </span>
      ),
    },

    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      render: (text) => {
        const user = userList.find((u) => u.id === text);
        return user ? `${user.id} - ${user.name}` : text;
      },
    },
    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: "Số lượng khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      render: (text) => <span>{text} khách</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space.Compact>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
            style={{ marginRight: 5 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa đặt phòng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
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
  ];

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
            🛠️ Quản lý đặt phòng
          </Title>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Search
            placeholder="🔍 Tìm kiếm theo mã phòng hoặc mã người dùng..."
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={handleSearch}
          />
        </Col>
        <Col>
          <Button
            color="cyan"
            variant="solid"
            size="large"
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>

      {roomsLoading ? (
        <>
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 5 }} />
        </>
      ) : error ? (
        <Alert message="Lỗi" description={error} type="error" showIcon />
      ) : (
        <Table
          dataSource={filteredBookingRooms}
          columns={columns}
          rowKey="id"
          loading={roomsLoading}
        />
      )}

      <CustomFormModal
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleFormSubmit}
        title={editData ? "Chỉnh sửa đặt phòng" : "Thêm đặt phòng mới"}
        fields={userFields}
        initialValues={editData ? editData : initialValues}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default BookingRoom;
