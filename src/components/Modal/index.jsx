import { Button, Modal } from "antd";
import { useState } from "react";

export default function ModalDefault(props) {
  const { children, title, befoIcon } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <span
        onClick={showModal}
        className="flex justify-center items-center gap-1.5"
      >
        {befoIcon}
        {title}
      </span>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button onClick={handleOk}>Search on Google</Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
}
