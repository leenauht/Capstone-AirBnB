import { useEffect, useState } from "react";
import ChatBoxLeft from "./ChatBoxLeft";
import ChatBoxRight from "./ChatBoxRight";

export default function ChatBox() {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [showRightOnMobile, setShowRightOnMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // chạy ngay lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {openChatBox && (
        <div className="fixed bottom-10 right-4 z-[1000] rounded-md shadow-lg bg-gray-200 overflow-hidden bg-cover w-[calc(100%-32px)] sm:w-[90%] md:w-4/5 lg:w-3/5 2xl:w-1/2 h-[70vh] max-h-[600px]">
          <div className="sm:flex w-full h-full sm:flex-row">
            {/* <ChatBoxLeft />
            <ChatBoxRight setOpenChatBox={setOpenChatBox} openChatBox={openChatBox} /> */}
            {isMobile ? (
              showRightOnMobile ? (
                <ChatBoxRight
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  backToLeft={() => setShowRightOnMobile(false)}
                />
              ) : (
                <ChatBoxLeft onSelectChat={() => setShowRightOnMobile(true)} />
              )
            ) : (
              <>
                <ChatBoxLeft />
                <ChatBoxRight isOpen={isOpen} setIsOpen={setIsOpen} />
              </>
            )}
          </div>
        </div>
      )}

      <img
        onClick={() => setOpenChatBox(true)}
        className="w-20 h-20 sm:w-24 sm:h-24 fixed bottom-6 right-4 cursor-pointer transition-transform hover:scale-105"
        src="./chat-bot-icon.gif"
      />
    </>
  );
}
