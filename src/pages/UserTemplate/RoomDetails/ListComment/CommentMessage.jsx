import { useSelector } from "react-redux";
import Rating from "../Rating";
import Avatar from "./../../_component/Avatar";
import RelativeTime from "./RelativeTime";

const IMG_DEFAULT =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuj8x4vZVQjh-Vow11mzwbMuzu4BT3VPy0eMXWSCxIIyoJF0_FtYW7aSwyeDtfx-1oIA&usqp=CAU";

export default function CommentMessage({ comment }) {
  const { noiDung, saoBinhLuan, ngayBinhLuan, tenNguoiBinhLuan, avatar } =
    comment;

  return (
    <>
      <Avatar imgAvatar={avatar || IMG_DEFAULT} width={56} height={56}>
        <div>{tenNguoiBinhLuan}</div>
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
