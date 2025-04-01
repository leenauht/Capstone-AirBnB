import { useState, useEffect } from "react";

export default function RelativeTime({ ngayBinhLuan }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const commentTime = new Date(ngayBinhLuan);
      const diffInSeconds = Math.floor((now - commentTime) / 1000);

      let displayTime;
      if (diffInSeconds < 60) {
        displayTime = "Vài giây trước";
      } else if (diffInSeconds < 3600) {
        displayTime = `${Math.floor(diffInSeconds / 60)} phút trước`;
      } else if (diffInSeconds < 86400) {
        displayTime = `${Math.floor(diffInSeconds / 3600)} giờ trước`;
      } else if (diffInSeconds < 2592000) {
        displayTime = `${Math.floor(diffInSeconds / 86400)} ngày trước`;
      } else if (diffInSeconds < 31536000) {
        displayTime = `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
      } else {
        displayTime = `${Math.floor(diffInSeconds / 31536000)} năm trước`;
      }

      setTimeAgo(displayTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [ngayBinhLuan]);

  return <div>{timeAgo}</div>;
}
