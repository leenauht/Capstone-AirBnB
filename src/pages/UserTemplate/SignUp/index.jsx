import FormDefault from "../../../components/FormDefault";
import ModalDefault from "../../../components/ModalDefault";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import { data } from "./data";

export default function SignUp() {
  const render = () => {
    return (
      <>
        {data?.map((item) => {
          return (
            <Form.Item
              key={item.label}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              {item.label === "DatePicker" ? (
                <DatePicker />
              ) : item.label === "Gender" ? (
                <Radio.Group>
                  {item.group?.map((group) => (
                    <Radio value={group.value}> {group.title} </Radio>
                  ))}
                </Radio.Group>
              ) : (
                <Input style={{ height: 40 }} />
              )}
            </Form.Item>
          );
        })}
      </>
    );
  };

  return (
    <li>
      <ModalDefault
        children={<FormDefault children={render()} />}
        title="Đăng ký"
        className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      ></ModalDefault>
    </li>
  );
}
