import FormDefault from "../../../components/FormDefault";
import ModalDefault from "../../../components/ModalDefault";
import { Button, Form, Input } from "antd";
import SignUp from "../SignUp";

export default function SignIn() {
  const dataSignIn = [
    {
      label: "Username",
      name: "username",
      rules: [
        {
          required: true,
          message: "Please input your username!",
        },
      ],
    },
    {
      label: "Password",
      name: "password",
      rules: [
        {
          required: true,
          message: "Please input your password!",
        },
      ],
    },
  ];

  const renderFormLogin = () => {
    return (
      <>
        {dataSignIn?.map((item) => {
          return (
            <Form.Item
              key={item.label}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          );
        })}
        <p className="text-end pr-10 -mt-5 mb-5 text-sm text-blue-700 cursor-pointer">
          Đăng ký ngay
        </p>
      </>
    );
  };

  return (
    <li>
      <ModalDefault
        children={<FormDefault children={renderFormLogin()} />}
        title="Đăng nhập"
        className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      ></ModalDefault>
    </li>
  );
}
