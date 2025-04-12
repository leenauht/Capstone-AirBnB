import ChevronLeft from "../../../Icons/ChevronLeft";
import ChevronRight from "../../../Icons/ChevronRight";
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
  TeamOutlined,
} from "@ant-design/icons";
import { EVENT_NAME } from "./ChatBoxRight";

export default function ChatBoxLeft() {
  return (
    <div className="w-[35%]">
      <div className="flex justify-between items-center py-1 pl-2 pr-1 border-b border-gray-300">
        <Logo color="red" width={32} height={32} text={false} />
        <div className="flex">
          <ChevronLeft width={20} height={20} type="single" />
          <ChevronRight width={20} height={20} type="single" />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col px-1 py-3 border-r border-gray-300 gap-3">
          <BellOutlined className="text-xl p-2 bg-white rounded-[10px]" />
          <TeamOutlined className="text-xl p-2 bg-white rounded-[10px]" />
          <CommentOutlined className="text-xl p-2 bg-white rounded-[10px]" />
        </div>
        <div className="flex-1">
          <div className="pl-5">
            <div className="flex justify-between items-center pr-2 pt-2">
              <p className="text-lg font-medium">Chat</p>
              <div className="flex gap-2">
                {filter_2_line({ width: 20, height: 20 })}
                {square_edit_outline({ width: 20, height: 20 })}
              </div>
            </div>
            <div className="flex items-center">
              {chevron_down_solid({ width: 20, height: 20 })}
              <p className="text-xs">Recent</p>
            </div>
          </div>

          <div>
            <div className="pr-3">
              <div className="flex items-center">
                {dot({ color: "#2563EB", width: 20, height: 20 })}
                <div className="p-2 bg-white rounded-[10px] flex-1">
                  {EVENT_NAME.CHAT_MESSAGE}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
