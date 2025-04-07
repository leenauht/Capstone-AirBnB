import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  setPagination,
  addLocation,
  updateLocation,
  deleteLocation,
  uploadLocationImage,
} from "./slice";
import {
  Table,
  Input,
  Pagination,
  Typography,
  Row,
  Col,
  Button,
  Upload,
  Space,
  Image,
  Popconfirm,
  Skeleton,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import CustomFormModal from "../_component/CustomFormModal";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import * as Yup from "yup";

const LocationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageIndex } = useParams();
  const { Title } = Typography;

  const { data, loading, pagination, keyword } = useSelector(
    (state) => state.locationsReducer
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(keyword || "");

  useEffect(() => {
    const currentPage = Number(pageIndex) || 1;
    dispatch(setPagination({ pageIndex: currentPage }));
    dispatch(
      fetchLocations({
        pageIndex: currentPage,
        pageSize: pagination.pageSize,
        search: searchTerm,
      })
    );
  }, [dispatch, pageIndex, pagination.pageSize, searchTerm]);

  const debouncedSearch = useRef(
    debounce((value) => {
      dispatch(
        fetchLocations({
          pageIndex: 1,
          pageSize: pagination.pageSize,
          search: value,
        })
      );
    }, 500)
  ).current;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleOpenModal = (data = null) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editData) {
        await dispatch(
          updateLocation({
            id: editData.id,
            ...values,
          })
        ).unwrap();
        toast.success("Cập nhật vị trí thành công!");
      } else {
        await dispatch(addLocation(values)).unwrap();
        toast.success("Thêm vị trí thành công!");
      }

      dispatch(
        fetchLocations({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          search: searchTerm,
        })
      );

      setIsModalOpen(false);
      setEditData(null);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(
        editData ? "Cập nhật vị trí thất bại!" : "Thêm vị trí thất bại!"
      );
    }
  };

  const handleDeleteLocation = useCallback(
    async (id) => {
      try {
        await dispatch(deleteLocation(id)).unwrap();
        toast.success(`Xóa vị trí ID ${id} thành công!`);

        const currentPage = Number(pageIndex) || pagination.pageIndex;

        dispatch(
          fetchLocations({
            search: searchTerm,
            pageIndex: currentPage,
            pageSize: pagination.pageSize,
          })
        );
      } catch {
        toast.error("❌ Lỗi khi xóa vị trí!");
      }
    },
    [dispatch, pageIndex, pagination.pageIndex, pagination.pageSize, searchTerm]
  );

  const handleUpload = useCallback(
    async (file, record) => {
      if (!record?.id) {
        toast.error("❌ Lỗi: Không xác định được mã vị trí!");
        return;
      }
      if (!file) {
        toast.error("❌ Lỗi: Không có file ảnh!");
        return;
      }

      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("maViTri", record.id);

      try {
        await dispatch(
          uploadLocationImage({ maViTri: record.id, file })
        ).unwrap();
        toast.success("✅ Cập nhật ảnh thành công!");
        dispatch(
          fetchLocations({
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
    { name: "tenViTri", label: "Tên vị trí", type: "text" },
    { name: "tinhThanh", label: "Tỉnh thành", type: "text" },
    { name: "quocGia", label: "Quốc gia", type: "text" },
  ];

  const getInitialValues = (editData) => ({
    tenViTri: editData?.tenViTri || "",
    tinhThanh: editData?.tinhThanh || "",
    quocGia: editData?.quocGia || "",
  });

  const validationSchema = Yup.object({
    tenViTri: Yup.string().required("Vui lòng nhập tên vị trí"),
    tinhThanh: Yup.string().required("Vui lòng nhập tỉnh thành"),
    quocGia: Yup.string().required("Vui lòng nhập quốc gia"),
  });

  const columns = useMemo(
    () => [
      { title: "Mã Vị Trí", dataIndex: "id", key: "id" },
      {
        title: "Hình ảnh",
        key: "image",
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              width={70}
              height={80}
              src={record.hinhAnh || null}
              fallback="public\image\placeholder.png"
              alt="Hình lỗi"
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
      { title: "Tên Vị Trí", dataIndex: "tenViTri", key: "tenViTri" },
      { title: "Tỉnh Thành", dataIndex: "tinhThanh", key: "tinhThanh" },
      { title: "Quốc Gia", dataIndex: "quocGia", key: "quocGia" },
      {
        title: "Hành động",
        key: "actions",
        render: (_, record) => (
          <Space.Compact>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleOpenModal(record)}
              size="small"
              style={{ marginRight: 5 }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => handleDeleteLocation(record.id)}
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
    [handleDeleteLocation, handleUpload]
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
            🛠️ Quản lý thông tin vị trí
          </Title>
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input.Search
            placeholder="🔍 Tìm kiếm vị trí..."
            value={searchTerm}
            onChange={handleSearchChange}
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
            Thêm vị trí
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
            columns={columns}
            dataSource={data}
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
              navigate(`/admin/QuanLyThongTinViTri/${page}`);
            }}
          />
        </>
      )}

      <CustomFormModal
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        title={editData ? "Chỉnh sửa vị trí" : "Thêm vị trí mới"}
        fields={userFields}
        initialValues={getInitialValues(editData)}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default LocationList;
