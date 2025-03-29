import { Flex, Rate } from "antd";
import { useState } from "react";

const desc = ["1 Sao", "2 Sao", "3 Sao", "4 Sao", "5 Sao"];

export default function Rating(props) {
  const [star, setStar] = useState(0);

  const handleOnChange = (newValue) => {
    setStar(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <>
      {props.type === "input" ? (
        <Flex gap="middle" vertical style={{ gap: 10 }}>
          <Rate tooltips={desc} onChange={handleOnChange} value={props.value} />
        </Flex>
      ) : (
        <Flex gap="middle" vertical style={{ gap: 10 }}>
          <Rate tooltips={desc} value={props.value} disabled />
        </Flex>
      )}
    </>
  );
}
