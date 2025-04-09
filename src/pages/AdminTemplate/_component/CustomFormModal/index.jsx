import React, { useEffect } from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Upload,
  Switch,
  Row,
  Col,
  Typography,
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const CustomFormModal = ({
  visible,
  onCancel,
  onSubmit,
  title,
  fields = [],
  initialValues = {},
  validationSchema,
}) => {
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
      form.resetFields();
    },
  });

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(
        Object.fromEntries(
          Object.entries(formik.values || {}).map(([key, value]) => [
            key,
            key === "birthday" && value ? dayjs(value) : value,
          ])
        )
      );
    }
  }, [visible, formik.values, form]);

  const handleCancel = () => {
    setTimeout(() => {
      formik.resetForm();
      form.resetFields();
    }, 100);
    onCancel();
  };

  // Tách các field kiểu switch
  const switchFields = fields.filter((f) => f.type === "switch");
  const otherFields = fields.filter((f) => f.type !== "switch");

  // Sắp xếp switch theo 3 cột
  const switchColumns = [[], [], []];
  switchFields.forEach((field, index) => {
    switchColumns[index % 3].push(field);
  });

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      onOk={formik.handleSubmit}
      okText="Lưu"
      cancelText="Hủy"
      width={600}
      centered
      destroyOnClose
    >
      <div style={{ marginBottom: "16px" }}>
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        <Text type="secondary"> Vui lòng điền đầy đủ thông tin bên dưới.</Text>
      </div>

      <Form
        layout="vertical"
        form={form}
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 16px",
        }}
      >
        <Row gutter={24}>
          {otherFields.map(({ name, label, type, options }) => (
            <Col span={12} key={name}>
              <Form.Item
                label={<Text strong>{label}</Text>}
                validateStatus={
                  formik.touched[name] && formik.errors[name] ? "error" : ""
                }
                help={
                  formik.touched[name] && formik.errors[name]
                    ? formik.errors[name]
                    : ""
                }
              >
                {type === "text" && (
                  <Input
                    {...formik.getFieldProps(name)}
                    onBlur={formik.handleBlur}
                    placeholder={`Nhập ${label.toLowerCase()}`}
                    style={{ width: "100%" }}
                  />
                )}
                {type === "password" && (
                  <Input.Password
                    {...formik.getFieldProps(name)}
                    onBlur={formik.handleBlur}
                    placeholder={`Nhập ${label.toLowerCase()}`}
                    style={{ width: "100%" }}
                  />
                )}
                {type === "date" && (
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    value={
                      formik.values[name] ? dayjs(formik.values[name]) : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        name,
                        date ? date.format("YYYY-MM-DD") : null
                      )
                    }
                    onBlur={() => formik.setFieldTouched(name, true)}
                  />
                )}
                {type === "select" && (
                  <Select
                    showSearch
                    placeholder={`Chọn ${label.toLowerCase()}`}
                    style={{ width: "100%" }}
                    value={
                      formik.values[name] === ""
                        ? undefined
                        : formik.values[name]
                    }
                    onChange={(value) => formik.setFieldValue(name, value)}
                    onBlur={() => formik.setFieldTouched(name, true)}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {options?.map((option) => (
                      <Select.Option
                        key={option.value}
                        value={option.value}
                        label={option.label}
                      >
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}

                {type === "radio" && (
                  <Radio.Group
                    value={formik.values[name]}
                    onChange={(e) => formik.setFieldValue(name, e.target.value)}
                    onBlur={() => formik.setFieldTouched(name, true)}
                    style={{ width: "100%" }}
                  >
                    {options?.map((option) => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
                {type === "upload" && (
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    showUploadList={false}
                    onChange={({ file }) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        formik.setFieldValue(name, reader.result);
                      };
                      reader.readAsDataURL(file.originFileObj);
                    }}
                    className="custom-upload"
                  >
                    {formik.values[name] ? (
                      <img
                        src={formik.values[name]}
                        alt="uploaded"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    ) : (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Tải ảnh</div>
                      </div>
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
        {switchFields.length > 0 && (
          <>
            <Title level={5} style={{ margin: "10px 0" }}>
              Tiện ích
            </Title>
            <Row gutter={16}>
              {switchColumns.map((col, colIndex) => (
                <Col span={8} key={colIndex}>
                  {col.map(({ name, label }) => (
                    <Form.Item
                      key={name}
                      label={<Text strong>{label}</Text>}
                      valuePropName="checked"
                      style={{ marginBottom: 12 }}
                    >
                      <Switch
                        checked={formik.values[name]}
                        onChange={(checked) =>
                          formik.setFieldValue(name, checked)
                        }
                        onBlur={() => formik.setFieldTouched(name, true)}
                      />
                    </Form.Item>
                  ))}
                </Col>
              ))}
            </Row>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default CustomFormModal;
