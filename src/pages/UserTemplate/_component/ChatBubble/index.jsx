import "./styles.css";

const ChatBubble = () => {
  return (
    <div className="chat-bubble !px-2 !py-0">
      <div className="typing !h-3">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default ChatBubble;
