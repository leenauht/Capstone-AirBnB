import React, { useEffect } from "react";
import { Form, Input, Modal, Select, DatePicker, Upload, Radio, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import dayjs from "dayjs";

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

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={handleCancel}
      onOk={formik.handleSubmit}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          {fields.map(({ name, label, type, options }) => (
            <Col span={12} key={name}>
              <Form.Item
                label={label}
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
                  />
                )}
                {type === "password" && (
                  <Input.Password
                    {...formik.getFieldProps(name)}
                    onBlur={formik.handleBlur}
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
                    value={formik.values[name] ?? ""}
                    onChange={(value) => formik.setFieldValue(name, value)}
                    onBlur={() => formik.setFieldTouched(name, true)}
                  >
                    {options?.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
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
                  >
                    {formik.values[name] ? (
                      <img
                        src={formik.values[name]}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Modal>
  );
};

export default CustomFormModal;
