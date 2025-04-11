import { Card, List } from "antd";
import { useState } from "react";
import { data } from "./data";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserInfo } from "../../../../store/sliceUserInfo";
import { toastSuccess } from "../../../../utils";
import Cookies from "js-cookie";

export default function Account() {
  const dispatch = useDispatch();
  const [itemSlected, setItemSelected] = useState(data[0]);

  const handleLogOut = () => {
    dispatch(resetUserInfo());
    toastSuccess("Bạn đã đăng xuất!");
    Cookies.remove("token");
    window.scrollTo(0, 0);
  };

  const renderItem = () => {};

  return (
    <div className="pt-[150px] pb-10 px-4 sm:px-6 lg:px-10 container mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold pb-8 text-center text-gray-700">
        {itemSlected.title}
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[30%] w-full lg:sticky top-10">
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
                      } text-base sm:text-lg font-bold`}
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
            className="block text-lg font-bold text-blue-500 hover:text-blue-700 transition duration-300"
            onClick={handleLogOut}
            to="/"
          >
            Đăng xuất tài khoản
          </NavLink>
        </div>

        <div className="flex-1">{itemSlected.content}</div>
      </div>
    </div>
  );
}
