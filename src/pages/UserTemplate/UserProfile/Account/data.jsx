import BookingHistory from "../BookingHistory";
import LoginAndSecurity from "./LoginAndSecurity";
import PaymentAndSettlement from "./PaymentAndSettlement";
import PresonalInfo from "./PresonalInfo";
import PrivacyAndSharing from "./PrivacyAndSharing";

export const data = [
  {
    id: 1,
    title: "Thông tin cá nhân",
    description:
      "Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ với bạn",
    content: <PresonalInfo />,
  },
  {
    id: 2,
    title: "Đăng nhập và bảo mật",
    description: "Cập nhật mật khẩu và bảo mật tài khoản của bạn",
    content: <LoginAndSecurity />,
  },
  {
    id: 3,
    title: "Thanh toán và chi trả",
    description:
      "Xem lại các khoản thanh toán, chi trả, phiếu giảm giá và thẻ quà tặng",
    content: <PaymentAndSettlement />,
  },
  {
    id: 4,
    title: "Quyền riêng tư và chia sẻ",
    description:
      "Quản lý dữ liệu cá nhân, các dịch vụ được kết nối và chế độ cài đặt chia sẻ dữ liệu của bạn",
    content: <PrivacyAndSharing />,
  },
  {
    id: 5,
    title: "Lịch sử đặt phòng",
    description: "Lịch sử đặt phòng",
    content: <BookingHistory />,
  },
  {
    id: 6,
    title: "",
    description: "",
    content: "",
  },
];
