import { Avatar, List } from "antd";

export default function PresonalInfo() {
  const dataUser = JSON.parse(localStorage.getItem("userInfo"));
  console.log(dataUser);
  const date = new Date(dataUser.birthday);
  const formattedDate = date.toLocaleDateString("vi-VN");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5 items-center bg-slate-200 p-5 rounded-xl">
        <Avatar
          size={60}
          icon={
            <img
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODE5NTY3ODE3ODIwMjIzMzIw/original/322d445c-efe0-437a-9cf8-9a7212da9c96.png?im_w=720"
              alt="logo"
            />
          }
        />
        <span className="text-lg font-medium">{dataUser.name}</span>
      </div>
      <div className="bg-slate-200 p-5 rounded-xl">
        <List className="w-full" itemLayout="horizontal">
          <List.Item>
            <div className="flex gap-5">
              <span>UID</span>
              <strong>{dataUser.id}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Email</span>
              <strong>{dataUser.email}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Birthday</span>
              <strong>{formattedDate}</strong>
            </div>
          </List.Item>
        </List>
      </div>
    </div>
  );
}
