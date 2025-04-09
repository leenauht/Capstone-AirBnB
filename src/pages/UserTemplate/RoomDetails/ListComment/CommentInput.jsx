import Avatar from "./../../_component/Avatar";
import { Input } from "antd";
import Send from "./../../../../Icons/Send";
import { useRef, useState } from "react";
import Rating from "../Rating";
import { useSelector } from "react-redux";
import { toastInfo } from "../../../../utils";

export const IMG_DEFAULT =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuj8x4vZVQjh-Vow11mzwbMuzu4BT3VPy0eMXWSCxIIyoJF0_FtYW7aSwyeDtfx-1oIA&usqp=CAU";

export default function CommentInput(props) {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const inputRef = useRef(null);
  const { onSubmit } = props;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  const validImage =
    userInfo?.avatar !== "" && userInfo?.avatar !== undefined
      ? userInfo?.avatar
      : IMG_DEFAULT;

  const handleOnChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim() === "") {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  };

  const handleBlur = () => {
    if (!message) {
      setErrorMessage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      setErrorMessage(true);
    }
    if (userInfo === null || userInfo === undefined) {
      toastInfo("Đăng nhập để được bình luận");
      return;
    }
    setLoading(true);
    await onSubmit(message.trim(), rating);
    setLoading(false);
    setErrorMessage(false);
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
            <p className="text-red-500 text-sm">Vui lòng nhập bình luận!</p>
          )}
        </form>
      </Avatar>
      {loading && <div>Loading .....</div>}
    </div>
  );
}
