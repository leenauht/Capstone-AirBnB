import { Button, Modal } from "antd";
import { useState } from "react";

export default function ModalDefault(props) {
  const { children, title, befoIcon, className, footer = null } = props;

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
      <span onClick={showModal} className={className}>
        {befoIcon}
        {title}
      </span>
      <Modal
        isModalOpen={isModalOpen}
        title={
          <div style={{ textAlign: "center", width: "100%" }}>{title}</div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
}
