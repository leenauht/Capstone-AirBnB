import { Flex, Rate } from "antd";
import { useState } from "react";

const desc = ["1 Sao", "2 Sao", "3 Sao", "4 Sao", "5 Sao"];

export default function Rating() {
  const [value, setValue] = useState(0);
  return (
    <Flex gap="middle" vertical style={{ gap: 10 }}>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {/* {value ? <span>{desc[value - 1]}</span> : null} */}
    </Flex>
  );
}
