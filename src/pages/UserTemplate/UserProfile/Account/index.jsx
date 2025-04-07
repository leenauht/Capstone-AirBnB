import { List } from "antd";
import { useState } from "react";
import { data } from "./data";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserInfo } from "../../../../store/sliceUserInfo";
import { toastSuccess } from "../../../../utils";

export default function Account() {
  const dispatch = useDispatch();
  const [itemSlected, setItemSelected] = useState(data[0]);

  const handleLogOut = () => {
    dispatch(resetUserInfo());
    toastSuccess("Bạn đã đăng xuất!");
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-[150px] pb-10 container mx-auto">
      <h2 className="text-[40px] font-bold pb-10 text-center text-gray-700">
        {itemSlected.title}
      </h2>
      <div className="flex flex-row gap-10">
        <div className="w-[30%] sticky top-10">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  onClick={() => setItemSelected(item)}
                  className="cursor-pointer"
                  title={
                    <p
                      className={`${
                        itemSlected.id === item.id ? "black" : "text-gray-500"
                      } text-xl font-bold`}
                    >
                      {item.title}
                    </p>
                  }
                  description={`${item.description ? item.description : ""}`}
                />
              </List.Item>
            )}
          />
          <NavLink
            className="text-xl font-bold text-blue-500 hover:text-blue-700 transition duration-300"
            onClick={handleLogOut}
            to="/"
          >
            Đăng xuất tài khoản
          </NavLink>
        </div>
        <div className="overflow-y-auto flex-1">{itemSlected.content}</div>
      </div>
    </div>
  );
}
