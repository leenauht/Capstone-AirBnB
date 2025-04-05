import Avatar from "./../../_component/Avatar";
import { Input } from "antd";
import Send from "./../../../../Icons/Send";
import { useState } from "react";
import Rating from "../Rating";

export const IMG_DEFAULT =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuj8x4vZVQjh-Vow11mzwbMuzu4BT3VPy0eMXWSCxIIyoJF0_FtYW7aSwyeDtfx-1oIA&usqp=CAU";

export default function CommentInput(props) {
  const { imgAvatar, onSubmit } = props;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const validImage =
    imgAvatar !== "" && imgAvatar !== undefined ? imgAvatar : IMG_DEFAULT;

  const handleOnChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim() === "") {
      setErrorMessage("Vui lòng nhập bình luận!");
    } else {
      setErrorMessage("");
    }
  };

  const handleBlur = () => {
    if (!message) {
      setErrorMessage("Vui lòng nhập bình luận!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      setErrorMessage("Vui lòng nhập bình luận!");
    }

    setLoading(true);
    await onSubmit(message.trim(), rating);
    setLoading(false);

    setMessage("");
    setRating(0);
  };

  return (
    <div className="pb-10">
      <h3 className="text-lg font-medium pb-5">Bình luận</h3>
      <Avatar imgAvatar={validImage} width={56} height={56}>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Rating onChange={setRating} type="input" value={rating} />

          <Input
            onBlur={handleBlur}
            required
            onChange={handleOnChange}
            showCount
            maxLength={500}
            placeholder="Viết đánh giá của bạn..."
            value={message}
            suffix={
              <div onClick={handleSubmit} className="hover:text-blue-600">
                <Send />
              </div>
            }
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </form>
      </Avatar>
      {loading && <div>Loading .....</div>}
    </div>
  );
}
