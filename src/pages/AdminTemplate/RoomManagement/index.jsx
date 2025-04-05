import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Table,
  Button,
  Modal,
  Image,
  Input,
  Skeleton,
  Typography,
  Pagination,
  Row,
  Col,
  Card,
  Tag,
  Upload,
  Space,
  Popconfirm,
} from "antd";
import {
  CarOutlined,
  DeleteOutlined,
  DesktopOutlined,
  EditOutlined,
  FireOutlined,
  HomeOutlined,
  InboxOutlined,
  PlusOutlined,
  SkinOutlined,
  ToolOutlined,
  UploadOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  addRoom,
  uploadRoomImage,
  setPagination,
  updateRoom,
  deleteRoom,
} from "./slice";
import { useNavigate, useParams } from "react-router-dom";
import CustomFormModal from "../_component/CustomFormModal";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import * as Yup from "yup";

const RoomManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageIndex } = useParams();
  const { Title } = Typography;
  const { rooms, loading, pagination, keyword } = useSelector(
    (state) => state.RoomManagementReducer
  );

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState(keyword || "");

  useEffect(() => {
    const currentPage = Number(pageIndex) || 1;
    dispatch(setPagination({ pageIndex: currentPage }));
    dispatch(
      fetchRooms({
        pageIndex: currentPage,
        pageSize: pagination.pageSize,
        search: searchTerm,
      })
    );
  }, [dispatch, pageIndex, pagination.pageSize, searchTerm]);

  const debouncedSearch = useRef(
    debounce((value) => {
      dispatch(setPagination({ pageIndex: 1 }));
      dispatch(
        fetchRooms({
          pageIndex: 1,
          pageSize: pagination.pageSize,
          search: value,
        })
      );
    }, 500)
  ).current;

  const showDetail = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleOpenModal = (mode, room = null) => {
    setFormMode(mode);
    setSelectedRoom(mode === "edit" ? room : null);
    setIsFormModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsFormModalOpen(false);
    setSelectedRoom(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSubmit = async (values) => {
    try {
      const updatedValues = { ...values };

      if (formMode === "edit" && selectedRoom?.id) {
        updatedValues.id = selectedRoom.id;
        await dispatch(updateRoom(updatedValues)).unwrap();
        toast.success(`Cập nhật phòng thành công!`);
      } else {
        await dispatch(addRoom(updatedValues)).unwrap();
        toast.success(`Thêm phòng thành công!`);
      }

      dispatch(fetchRooms(pagination));
      setIsFormModalOpen(false);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(
        selectedRoom?.id ? "Cập nhật phòng thất bại!" : "Thêm phòng thất bại!"
      );
    }
  };

  const handleDeleteRoom = useCallback(
    async (id) => {
      try {
        await dispatch(deleteRoom(id)).unwrap();
        toast.success(`Xóa phòng ID ${id} thành công!`);
      } catch {
        toast.error("❌ Lỗi khi xóa phòng!");
      }
    },
    [dispatch]
  );

  const handleUpload = useCallback(
    async (file, record) => {
      if (!record?.id) {
        toast.error("❌ Lỗi: Không xác định được mã phòng!");
        return;
      }
      if (!file) {
        toast.error("❌ Lỗi: Không có file ảnh!");
        return;
      }

      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("maPhong", record.id);

      try {
        await dispatch(uploadRoomImage({ maPhong: record.id, file })).unwrap();
        toast.success("✅ Cập nhật ảnh thành công!");
        dispatch(
          fetchRooms({
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
            search: searchTerm,
          })
        );
      } catch (error) {
        console.error("Lỗi upload ảnh:", error);
        toast.error("❌ Cập nhật ảnh thất bại!");
      }
    },
    [dispatch, pagination.pageIndex, pagination.pageSize, searchTerm]
  );

  const userFields = [
    { name: "tenPhong", label: "Tên Phòng", type: "text" },
    { name: "khach", label: "Khách", type: "text" },
    { name: "phongNgu", label: "Phòng ngủ", type: "text" },
    { name: "giuong", label: "Giường", type: "text" },
    { name: "phongTam", label: "Phòng Tắm", type: "text" },
    { name: "moTa", label: "Mô Tả", type: "text" },
    { name: "giaTien", label: "Giá Tiền", type: "text" },
    { name: "maViTri", label: "Mã Vị Trí", type: "text" },
    {
      name: "mayGiat",
      label: "Máy Giặt",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "banLa",
      label: "Bàn Là",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "tivi",
      label: "Tivi",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "dieuHoa",
      label: "Điều Hòa",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "wifi",
      label: "Wifi",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "bep",
      label: "Bếp",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "doXe",
      label: "Đỗ Xe",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "hoBoi",
      label: "Hồ Bơi",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
    {
      name: "banUi",
      label: "Bàn Ủi",
      type: "radio",
      options: [
        { value: true, label: "Có" },
        { value: false, label: "Không" },
      ],
    },
  ];

  const getInitialValues = (editData) => ({
    tenPhong: editData?.tenPhong || "",
    khach: editData?.khach || "",
    phongNgu: editData?.phongNgu || "",
    giuong: editData?.giuong || "",
    phongTam: editData?.phongTam || "",
    moTa: editData?.moTa || "",
    giaTien: editData?.giaTien || "",
    maViTri: editData?.maViTri || "",
    mayGiat: editData?.mayGiat ?? true,
    banLa: editData?.banLa ?? true,
    tivi: editData?.tivi ?? true,
    dieuHoa: editData?.dieuHoa ?? true,
    wifi: editData?.wifi ?? true,
    bep: editData?.bep ?? true,
    doXe: editData?.doXe ?? true,
    hoBoi: editData?.hoBoi ?? true,
    banUi: editData?.banUi ?? true,
  });

  const validationSchema = Yup.object({
    tenPhong: Yup.string().required("Vui lòng nhập tên phòng"),
    khach: Yup.string()
      .required("Vui lòng nhập số lượng khách")
      .matches(/^\d+$/, "Chỉ được nhập số!"),
    phongNgu: Yup.string()
      .required("Vui lòng nhập số lượng phòng ngủ")
      .matches(/^\d+$/, "Chỉ được nhập số!"),
    giuong: Yup.string()
      .required("Vui lòng nhập số lượng giường")
      .matches(/^\d+$/, "Chỉ được nhập số!"),
    phongTam: Yup.string()
      .required("Vui lòng nhập số lượng phòng tắm")
      .matches(/^\d+$/, "Chỉ được nhập số!"),
    maViTri: Yup.string()
      .required("Vui lòng nhập mã vị trí")
      .matches(/^\d+$/, "Chỉ được nhập số!"),
    moTa: Yup.string().required("Vui lòng nhập mô tả"),
    giaTien: Yup.string()
      .required("Vui lòng nhập giá tiền")
      .matches(/^\d+$/, "Chỉ được nhập số!"),
  });

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Tên Phòng",
        dataIndex: "tenPhong",
        key: "tenPhong",
      },
      {
        title: "Hình Ảnh",
        dataIndex: "hinhAnh",
        key: "hinhAnh",
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              width={80}
              height={50}
              src={record.hinhAnh || "https://dummyimage.com/80"}
              alt="Hình ảnh vị trí"
              style={{
                borderRadius: "5px",
                objectFit: "cover",
                border: "1px solid #ddd",
                padding: "2px",
              }}
            />
            <Upload
              customRequest={({ file }) => handleUpload(file, record)}
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                size="small"
                style={{
                  fontSize: "12px",
                  padding: "4px 8px",
                }}
              >
                Upload
              </Button>
            </Upload>
          </div>
        ),
      },
      {
        title: "Mô Tả",
        dataIndex: "moTa",
        key: "moTa",
        ellipsis: true,
      },
      {
        title: "Hành Động",
        key: "action",
        width: 220,
        render: (_, record) => (
          <Space.Compact>
            <Button
              color="purple"
              variant="solid"
              size="small"
              style={{ marginRight: 5 }}
              onClick={() => showDetail(record)}
            >
              Chi Tiết
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
              onConfirm={() => handleDeleteRoom(record.id)}
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
    [handleUpload, handleDeleteRoom]
  );

  const renderTags = (room) => {
    return Object.keys(amenitiesList)
      .filter((key) => room[key]) // Lọc các tiện ích có giá trị true
      .map((key) => (
        <Tag
          color={amenitiesList[key].color}
          key={key}
          style={{ marginBottom: 5 }}
        >
          {amenitiesList[key].icon} {amenitiesList[key].label}
        </Tag>
      ));
  };

  const amenitiesList = {
    mayGiat: { label: "Máy Giặt", icon: <SkinOutlined />, color: "magenta" },
    banLa: { label: "Bàn Là", icon: <ToolOutlined />, color: "red" },
    tivi: { label: "Tivi", icon: <DesktopOutlined />, color: "volcano" },
    dieuHoa: { label: "Điều Hòa", icon: <FireOutlined />, color: "orange" },
    wifi: { label: "WiFi", icon: <WifiOutlined />, color: "lime" },
    bep: { label: "Bếp", icon: <HomeOutlined />, color: "green" },
    doXe: { label: "Đỗ Xe", icon: <CarOutlined />, color: "cyan" },
    hoBoi: { label: "Hồ Bơi", icon: <InboxOutlined />, color: "geekblue" },
    banUi: { label: "Bàn Ủi", icon: <ToolOutlined />, color: "purple" },
  };

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
            🛠️ Quản lý thông tin phòng
          </Title>
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input.Search
            placeholder="🔍 Tìm kiếm phòng..."
            value={searchTerm}
            onChange={handleSearch}
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
            onClick={() => handleOpenModal()}
          >
            Thêm phòng
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
            dataSource={rooms}
            columns={columns}
            rowKey="id"
            pagination={false}
            scroll={{ y: 500 }}
            style={{ marginBottom: 10 }}
            loading={loading}
          />
          <Pagination
            current={pagination.pageIndex}
            pageSize={pagination.pageSize}
            total={pagination.totalRow}
            showSizeChanger
            onChange={(page) => {
              dispatch(setPagination({ pageIndex: page }));
              navigate(`/admin/QuanLyThongTinPhong/${page}`);
            }}
          />
        </>
      )}

      <Modal
        title="Chi Tiết Phòng"
        open={isModalOpen}
        onCancel={handleClose}
        footer={
          <Button key="close" onClick={handleClose}>
            Đóng
          </Button>
        }
        width={600}
      >
        {selectedRoom && (
          <Card
            style={{
              border: "none",
            }}
          >
            {/* Hình Ảnh - Hiển thị trên cùng */}
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <Image
                width="100%"
                height={250}
                src={selectedRoom.hinhAnh}
                alt="Hình phòng"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                  maxHeight: "250px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>

            {/* Thông Tin Phòng */}
            <Typography.Title
              level={4}
              style={{
                color: "#333",
                fontSize: "22px",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              🏠 {selectedRoom.tenPhong}
            </Typography.Title>

            <Typography.Paragraph style={{ lineHeight: 1.6, fontSize: "16px" }}>
              <strong>Mô Tả:</strong> {selectedRoom.moTa}
            </Typography.Paragraph>

            <Row gutter={16}>
              <Col span={12}>
                <div
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                >
                  <p style={{ fontSize: "16px" }}>
                    <strong>📌 ID:</strong> {selectedRoom.id}
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <strong>👥 Khách:</strong> {selectedRoom.khach}
                  </p>

                  <p style={{ fontSize: "16px" }}>
                    <strong>💰 Giá Tiền:</strong> {selectedRoom.giaTien} $
                  </p>
                </div>
              </Col>

              <Col span={12}>
                <div
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                >
                  <p style={{ fontSize: "16px" }}>
                    <strong>🛏️ Giường:</strong> {selectedRoom.giuong}
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <strong>🚿 Phòng Tắm:</strong> {selectedRoom.phongTam}
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <strong>🛏️ Phòng Ngủ:</strong> {selectedRoom.phongNgu}
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <strong>📍 Mã Vị Trí:</strong> {selectedRoom.maViTri}
                  </p>
                </div>
              </Col>
            </Row>

            {/* Đường gạch ngang */}
            <div
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                margin: "15px 0",
              }}
            />

            {/* Tiện ích */}
            <div style={{ marginTop: "15px" }}>
              <p style={{ fontSize: "16px", marginBottom: "5px" }}>
                <strong>🛠️ Tiện Ích:</strong>
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {renderTags(selectedRoom)}
              </div>
            </div>
          </Card>
        )}
      </Modal>
      <CustomFormModal
        visible={isFormModalOpen}
        onCancel={() => setIsFormModalOpen(false)}
        onSubmit={handleSubmit}
        title={formMode === "add" ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
        fields={userFields}
        initialValues={getInitialValues(selectedRoom)}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default RoomManagement;
