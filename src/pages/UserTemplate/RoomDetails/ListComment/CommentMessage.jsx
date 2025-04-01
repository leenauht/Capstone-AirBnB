import { useEffect, useState } from "react";
import Rating from "../Rating";
import Avatar from "./../../_component/Avatar";
import api from "../../../../services/api";
import RelativeTime from "./RelativeTime";

const IMG_DEFAULT =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuj8x4vZVQjh-Vow11mzwbMuzu4BT3VPy0eMXWSCxIIyoJF0_FtYW7aSwyeDtfx-1oIA&usqp=CAU";

export default function CommentMessage({ comment }) {
  const { noiDung, saoBinhLuan, maNguoiBinhLuan, ngayBinhLuan } = comment;
  const [user, setUser] = useState([]);
  const validImage =
    user.avatar !== "" && user.avatar !== undefined ? user.avatar : IMG_DEFAULT;

  const fetchUserId = async () => {
    try {
      const result = await api.get(`/users/${maNguoiBinhLuan}`);
      setUser(result.content);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <>
      <Avatar imgAvatar={validImage} width={56} height={56}>
        <div>{user.name}</div>
      </Avatar>
      <div className="pt-2 space-y-3">
        <div className="flex gap-5">
          <Rating value={saoBinhLuan} type="message" />
          <RelativeTime ngayBinhLuan={ngayBinhLuan} />
        </div>
        <div className="line-clamp-3">{noiDung}</div>
      </div>
    </>
  );
}
