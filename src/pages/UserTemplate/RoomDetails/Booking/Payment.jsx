import { Modal } from "antd";
import { useParams } from "react-router-dom";

export default function Payment(props) {
  const { id } = useParams();
  return (
    <Modal
      title={
        <div style={{ textAlign: "center", width: "100%" }}>Đặt phòng</div>
      }
      open={props.open}
      onCancel={() => props.setOpen(false)}
      footer={<></>}
    >
      <div>
        <h4>Chuyến đi của bạn</h4>
        <div className="flex justify-between">
          <div>
            <p>Ngày</p>
            <span>1-6 thg 4</span>
          </div>
          <div>Chỉnh sửa</div>
        </div>
        <div className="flex justify-between">
          <div>
            <p>Khách</p>
            <span>1 khách</span>
          </div>
          <div>Chỉnh sửa</div>
        </div>
      </div>
      <div>
        <h4>Phương thức thanh toán</h4>
      </div>
    </Modal>
  );
}
