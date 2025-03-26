import CommentMessage from "./CommentMessage";
import CommentInput from "./CommentInput";
import { useState } from "react";
import { timeDelay } from "../../../../utils";

export default function ListComment() {
  const [messages, setMessages] = useState([]);
  const onSubmit = async (message) => {
    await timeDelay(3000);
    setMessages([message, ...message]);
  };

  return (
    <div className="pb-10">
      <CommentInput
        onSubmit={onSubmit}
        imgAvatar="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODE5NTY3ODE3ODIwMjIzMzIw/original/322d445c-efe0-437a-9cf8-9a7212da9c96.png?im_w=720"
      />
      {messages.length > 0 ? (
        messages.map((message) => (
          <CommentMessage
            message={message}
            imgAvatar="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODE5NTY3ODE3ODIwMjIzMzIw/original/322d445c-efe0-437a-9cf8-9a7212da9c96.png?im_w=720"
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">Chưa có bình luận nào.</p>
      )}
    </div>
  );
}
