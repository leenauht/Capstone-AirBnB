import Avatar from "./../../_component/Avatar";
import { Input } from "antd";
import Send from "./../../../../Icons/Send";
import { useState } from "react";

export default function CommentInput(props) {
  const { imgAvatar, onSubmit } = props;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);
    await onSubmit(message.trim());
    setLoading(false);

    setMessage("");
  };

  return (
    <div>
      <h3>Bình luận</h3>
      <Avatar imgAvatar={imgAvatar} width={56} height={56}>
        <form onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setMessage(e.target.value)}
            showCount
            maxLength={100}
            value={message}
            suffix={
              <div onClick={handleSubmit} className="hover:text-blue-600">
                <Send />
              </div>
            }
          />
        </form>
      </Avatar>
      {loading && <div>Loading .....</div>}
    </div>
  );
}
