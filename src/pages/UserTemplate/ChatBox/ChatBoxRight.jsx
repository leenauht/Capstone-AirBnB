import { Avatar, Input, Tooltip } from "antd";
import {
  AntDesignOutlined,
  MinusOutlined,
  SearchOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ChatBubble from "../_component/ChatBubble";
import { socket } from "./SeverUrl";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { createGuid, getDeviceId } from "../../../utils";
import cl from "classnames";
import dayjs from "dayjs";

export const EVENT_NAME = {
  CHAT_MESSAGE: "CHAT_MESSAGE",
  TYPING: "TYPING",
};

export default function ChatBoxRight(props) {
  const { isOpen, setIsOpen } = props;
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const [msgInput, setMsgInput] = useState("");
  const [listMsg, setListMsg] = useState([]);
  const [listTyping, setListTyping] = useState([]);
  const listRef = useRef(null);

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
    handleSendTyping(false);
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
    <div className="w-[65%] flex flex-col">
      <div className="flex justify-between items-center py-1 pr-2 pl-1">
        <Input prefix={<SearchOutlined />} className="w-1/2" />

        <div className="flex items-center gap-2">
          <Avatar
            src={userInfo?.avatar}
            icon={!userInfo ? <UserOutlined /> : undefined}
          >
            {userInfo?.name ? userInfo?.name?.[0] : undefined}
          </Avatar>
          <MinusOutlined
            onClick={() => setIsOpen(false)}
            style={{ fontSize: "20px", width: "20px", height: "20px" }}
            className="text-blue-500 hover:text-blue-900 transition duration-300"
          />
        </div>
      </div>
      <div className="shadow-box-shadow-3 rounded-md bg-white flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between py-2 px-5 bg-bg-opacity-7">
          <div className="">{EVENT_NAME.CHAT_MESSAGE}</div>
        </div>
        <ul
          className="flex-1 overflow-y-auto flex flex-col border-y"
          ref={listRef}
        >
          <div className="">
            {listMsg &&
              listMsg.map((item) => {
                const formattedDate = dayjs(item.time).format(
                  "HH:mm DD/MM/YYYY"
                );
                const isCurrentUser =
                  item.userId === userInfo?.id || item.userId === getDeviceId();
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
                    !listTypingFiltered[0].isUser ? <UserOutlined /> : undefined
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
    </div>
  );
}
