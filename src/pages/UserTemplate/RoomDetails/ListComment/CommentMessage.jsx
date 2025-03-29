import Rating from "../Rating";
import Avatar from "./../../_component/Avatar";

export default function CommentMessage(props) {
  const { imgAvatar, message, rating } = props;

  return (
    <>
      <Avatar imgAvatar={imgAvatar} width={56} height={56}>
        <div>
          <div>Ten NHan vat</div>
          <div>xyz</div>
        </div>
      </Avatar>
      <div className="">
        <div className="flex gap-5">
          <Rating value={rating} type="message" />
          <div>Ngày đánh giá</div>
        </div>
        <div className="line-clamp-3">{message}</div>
      </div>
    </>
  );
}
