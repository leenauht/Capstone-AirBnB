import { useState } from "react";
import ChatBoxLeft from "./ChatBoxLeft";
import ChatBoxRight from "./ChatBoxRight";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed right-5 bottom-10 rounded-md z-[1000] w-[90%] sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-3/5 h-[70%] bg-cover bg-gray-200 overflow-hidden shadow-box-shadow-3">
          <div className="flex w-full h-full">
            <ChatBoxLeft />
            <ChatBoxRight setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
        </div>
      )}

      <img
        onClick={() => setIsOpen(true)}
        className="w-40 h-40 fixed right-0 bottom-14 cursor-pointer"
        src="./chat-bot-icon.gif"
      />
    </>
  );
}
