import {
  Avatar,
  Button,
  Card,
  Image,
  Input,
  Modal,
  Popover,
  Tooltip,
} from "antd";
import { useEffect, useState, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import {
  AntDesignOutlined,
  MinusOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createGuid, getDeviceId } from "../../../utils";
import dayjs from "dayjs";
import cl from "classnames";
import ChatBubble from "../_component/ChatBubble";

const socket = io("https://chatbox-production-b96f.up.railway.app", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true,
});
export default function ChatBox() {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const [msgInput, setMsgInput] = useState("");
  const [listMsg, setListMsg] = useState([]);
  const [listTyping, setListTyping] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);

  const EVENT_NAME = {
    CHAT_MESSAGE: "CHAT_MESSAGE",
    TYPING: "TYPING",
  };

  const getInforUserMessage = () => {
    return {
      name: userInfo?.name,
      avatar: userInfo?.avatar,
      userId: userInfo?.id || getDeviceId(),
      id: createGuid(),
      isUser: !!userInfo,
    };
  };

  const handleSendMessage = () => {
    msgInput &&
      socket.emit(EVENT_NAME.CHAT_MESSAGE, {
        message: msgInput,
        ...getInforUserMessage(),
      });
    setMsgInput("");
  };

  const handleSendTyping = (typing) => {
    socket.emit(EVENT_NAME.TYPING, {
      typing: typing,
      ...getInforUserMessage(),
    });
  };

  const handleInPutChange = (e) => {
    const value = e.target.value;
    setMsgInput(value);
    handleSendTyping(!!value);
  };

  const listTypingFiltered = useMemo(() => {
    const inforUser = getInforUserMessage();
    return listTyping.filter((item) => item.userId !== inforUser.userId);
  }, [listTyping, userInfo]);

  useEffect(() => {
    // Khi comments thay đổi, tự động scroll xuống cuối
    if (listRef?.current && isOpen) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [listMsg, isOpen]);

  useEffect(() => {
    socket.on(EVENT_NAME.CHAT_MESSAGE, (dataMessage) => {
      setListMsg((listMsg) => [...listMsg, dataMessage]);
    });
    socket.on(EVENT_NAME.TYPING, (typing) => {
      setListTyping((currentList) => {
        if (typing.typing) {
          const isExsit = !!currentList.find(
            (item) => item.userId === typing.userId
          );
          if (isExsit) return currentList;
          return [...currentList, typing];
        } else {
          return currentList.filter((item) => item.userId !== typing.userId);
        }
      });
    });

    return () => {
      socket.off(EVENT_NAME.CHAT_MESSAGE);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed flex flex-col rounded-xl z-[1000] w-[90%] sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-[500px] h-[70%] bg-cover bg-white right-5 bottom-10 overflow-hidden shadow-box-shadow-3">
          <div className="flex justify-between py-2 px-5 bg-bg-opacity-7">
            <div className="">{EVENT_NAME.CHAT_MESSAGE}</div>
            <MinusOutlined
              onClick={() => setIsOpen(false)}
              style={{ fontSize: "20px", width: "20px", height: "20px" }}
              className="text-blue-500 hover:text-blue-900 transition duration-300"
            />
          </div>
          <ul
            className="flex-1 h-full overflow-y-auto flex flex-col border-y"
            ref={listRef}
          >
            <div className="flex-1">
              {listMsg &&
                listMsg.map((item) => {
                  const formattedDate = dayjs(item.time).format(
                    "HH:mm DD/MM/YYYY"
                  );
                  const isCurrentUser =
                    item.userId === userInfo?.id ||
                    item.userId === getDeviceId();
                  return (
                    <li
                      key={item.id}
                      className={cl("flex items-end px-5 py-2 gap-3", {
                        ["flex-row-reverse"]: isCurrentUser,
                      })}
                    >
                      <div className="flex flex-col gap-1 items-center">
                        <Avatar
                          src={item.avatar}
                          icon={!item.isUser ? <UserOutlined /> : undefined}
                        >
                          {item?.name ? item?.name?.[0] : undefined}
                        </Avatar>
                        <div className="whitespace-nowrap w-fit h-fit text-xs p-1 rounded-full">
                          {item.name || "Ẩn danh"}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-1">
                        <div
                          className={`flex flex-col ${
                            isCurrentUser ? "items-end" : ""
                          }`}
                        >
                          <div className="flex justify-center w-full text-gray-500">
                            <span className="w-fit h-fit text-[11px] pb-1">
                              {formattedDate}
                            </span>
                          </div>
                          <div
                            className={cl("w-3/5 flex", {
                              ["justify-end"]: isCurrentUser,
                              ["justify-start"]: !isCurrentUser,
                            })}
                          >
                            <span
                              className={`bg-white w-fit overflow-word-break text-base leading-5 py-1 px-2 rounded-md shadow-box-shadow-3 ${
                                isCurrentUser ? "bg-blue-300" : ""
                              }`}
                            >
                              {item.message}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </div>
            {!!listTypingFiltered.length && (
              <div className="flex gap-1 items-center flex-row pl-6 pb-1">
                <Avatar.Group
                  size="large"
                  max={{
                    count: 2,
                    style: {
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      cursor: "pointer",
                    },
                    popover: { trigger: "click" },
                  }}
                >
                  <Avatar
                    src={listTypingFiltered[0].avatar || undefined}
                    icon={
                      !listTypingFiltered[0].isUser ? (
                        <UserOutlined />
                      ) : undefined
                    }
                  >
                    {listTypingFiltered[0]?.name
                      ? listTypingFiltered[0]?.name?.[0]
                      : undefined}
                  </Avatar>
                  {listTypingFiltered[1] && (
                    <Avatar
                      src={listTypingFiltered[1].avatar}
                      icon={
                        !listTypingFiltered[1].isUser ? (
                          <UserOutlined />
                        ) : undefined
                      }
                    >
                      {listTypingFiltered[1]?.name
                        ? listTypingFiltered[1]?.name?.[1]
                        : undefined}
                    </Avatar>
                  )}

                  {listTypingFiltered[2] && (
                    <>
                      <Tooltip title="Ant User" placement="top">
                        <Avatar
                          style={{ backgroundColor: "#87d068" }}
                          icon={<UserOutlined />}
                        />
                      </Tooltip>
                      <Avatar
                        style={{ backgroundColor: "#1677ff" }}
                        icon={<AntDesignOutlined />}
                      />
                    </>
                  )}
                </Avatar.Group>

                <div className="whitespace-nowrap w-fit h-fit text-xs p-1 rounded-full">
                  {listTypingFiltered[0].name || "Ẩn danh"} <ChatBubble />
                </div>
              </div>
            )}
          </ul>

          <div className="p-5 bg-bg-opacity-7">
            <Input
              className="!bg-cyan-50"
              suffix={
                <SendOutlined
                  className="hover:text-blue-600"
                  onClick={handleSendMessage}
                />
              }
              value={msgInput}
              onChange={handleInPutChange}
              placeholder="Bạn suy nghĩ gì?"
              onPressEnter={handleSendMessage}
            />
          </div>
        </div>
      )}

      <img
        onClick={() => setIsOpen(true)}
        className="w-40 h-40 fixed right-0 bottom-14 cursor-pointer"
        src="./chat-bot-icon.gif"
      />

      <div className="w-20 h-20 "></div>
    </>
  );
}
