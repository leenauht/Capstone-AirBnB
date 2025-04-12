import {
  chevron_down_solid,
  dot,
  filter_2_line,
  square_edit_outline,
} from "../../../Icons/iconjs";
import Logo from "../../../Icons/Logo";
import {
  BellOutlined,
  CommentOutlined,
  DownOutlined,
  MinusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { EVENT_NAME } from "./ChatBoxRight";

export default function ChatBoxLeft(props) {
  const { onSelectChat, setIsOpen } = props;
  return (
    <div className="w-full sm:w-[40%] md:w-[45%] lg:w-[35%] 2xl:w-[30%]">
      <div className="flex justify-between items-center py-1 pl-2 pr-1 border-b border-gray-300">
        <Logo color="red" width={32} height={32} text={false} />
        <MinusOutlined
          onClick={() => setIsOpen(false)}
          className="text-blue-500 hover:text-blue-900 transition duration-300 cursor-pointer pr-1 sm:hidden"
          style={{ fontSize: 20 }}
        />
      </div>

      <div className="flex">
        {/* Sidebar icons */}
        <div className="flex flex-col px-2 py-4 border-r border-gray-300 gap-4">
          <BellOutlined className="text-xl p-2 bg-white rounded-[10px] hover:bg-gray-100 cursor-pointer transition" />
          <TeamOutlined className="text-xl p-2 bg-white rounded-[10px] hover:bg-gray-100 cursor-pointer transition" />
          <CommentOutlined className="text-xl p-2 bg-white rounded-[10px] hover:bg-gray-100 cursor-pointer transition" />
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-100px)]">
          <div className="pl-5">
            <div className="flex justify-between items-center pr-2 pt-2">
              <p className="text-lg font-medium">Chat</p>
              <div className="flex gap-2">
                {filter_2_line({ width: 20, height: 20 })}
                {square_edit_outline({ width: 20, height: 20 })}
              </div>
            </div>

            <div className="flex items-center mt-2 gap-2">
              {chevron_down_solid({ width: 20, height: 20 })}
              <p className="text-xs text-gray-600">Recent</p>
            </div>
          </div>

          <div className="pr-3 pt-3">
            <div className="flex items-center gap-2">
              {dot({ color: "#2563EB", width: 20, height: 20 })}
              <div
                onClick={onSelectChat}
                className="p-2 bg-white rounded-[10px] flex-1"
              >
                {EVENT_NAME.CHAT_MESSAGE}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
