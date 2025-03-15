import { Button, Form, Input } from "antd";

export default function FormDefault(props) {
  const { children } = props;

  const onFinish = (values) => {
    // console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="pt-4">
        {children}
        <div className="flex justify-center">
          <Button type="primary" htmlType="submit" className="w-1/3">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
}
