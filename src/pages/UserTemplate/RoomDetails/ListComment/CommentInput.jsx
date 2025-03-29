import Avatar from "./../../_component/Avatar";
import { Button, Form, Input } from "antd";
import Send from "./../../../../Icons/Send";
import { useState } from "react";
import Rating from "../Rating";

export default function CommentInput(props) {
  const [form] = Form.useForm();
  const { imgAvatar, onSubmit } = props;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim() === "") {
      setErrorMessage("Vui lòng nhập bình luận!");
    } else {
      setErrorMessage("");
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
    <div>
      <h3>Bình luận</h3>
      <Avatar imgAvatar={imgAvatar} width={56} height={56}>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Rating onChange={setRating} type="input" value={rating} />

          <Input
            required
            className="relative"
            onChange={handleOnChange}
            showCount
            maxLength={100}
            value={message}
            suffix={
              <div onClick={handleSubmit} className="hover:text-blue-600">
                <Send htmlType="submit" />
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
