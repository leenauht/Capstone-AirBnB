import { Avatar, Badge, List, message, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import api from "../../../../services/api";
import { IMG_DEFAULT } from "../../RoomDetails/ListComment/CommentInput";
import { toast } from "react-toastify";
import Camera from "./../../../../Icons/Camera";
import { CameraOutlined } from "@ant-design/icons";
import UpdateUserForm from "../../UpdateUserForm";
export default function PresonalInfo() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const formattedDate = useMemo(() => {
    if (!userInfo?.birthday) return null;
    const date = new Date(userInfo.birthday);
    return date.toLocaleDateString("vi-VN");
  }, [userInfo]);

  const handleUpload = async ({ file }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("formFile", file);

    try {
      const response = await api.post("/users/upload-avatar", formData);
      if (response.content) {
        toast.success("Thay đổi avatar thành công!");
        const dataString = JSON.stringify(response.content);
        localStorage.setItem("userInfo", dataString);
        setUserInfo(response.content);
      }
    } catch (error) {
      toast.error("Lỗi khi tải ảnh lên!");
    }
    setLoading(false);
  };

  const onShowEditForm = () => {
    setShowEditForm(true);
  };

  console.log("userInfo", userInfo);

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(dataUser);
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5 items-center bg-slate-200 p-5 rounded-xl">
        <div className="relative cursor-pointer overflow-hidden">
          <span className="absolute w-full h-full top-0 flex justify-center items-center opacity-0 hover:opacity-80 transition duration-300">
            <Camera />
          </span>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                toast.error("Chỉ được chọn file ảnh!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            customRequest={({ file }) => handleUpload({ file })}
          >
            <Avatar
              size={60}
              icon={<img src={userInfo?.avatar || IMG_DEFAULT} alt="logo" />}
            />
            <div className="absolute top-0 opacity-0 hover:opacity-100 w-full h-full rounded-full flex justify-center items-center duration-300 transition">
              <CameraOutlined
                style={{
                  color: "white",
                  fontSize: "20px",
                  backgroundColor: "gray",
                  padding: "4px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </Upload>
        </div>

        <span className="text-lg font-medium">{userInfo?.name}</span>
      </div>
      <div className="bg-slate-200 p-5 rounded-xl">
        <List className="w-full" itemLayout="horizontal">
          <List.Item>
            <div className="flex gap-5">
              <span>UID:</span>
              <strong>{userInfo?.id}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Email:</span>
              <strong>{userInfo?.email}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Số điện thoại:</span>
              <strong>{userInfo?.phone}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Giới tính:</span>
              <strong>{userInfo?.gender ? "Nam" : "Nữ"}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Ngày sinh:</span>
              <strong>{formattedDate}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Tài khoản:</span>
              <strong>{userInfo?.role}</strong>
            </div>
          </List.Item>
          <List.Item></List.Item>
        </List>
        <div className="flex justify-end">
          <button
            onClick={onShowEditForm}
            className="py-2 px-5 bg-blue-500 rounded-full text-white hover:bg-blue-700 transition duration-300"
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>
      <UpdateUserForm
        setOpen={setShowEditForm}
        setUserInfo={setUserInfo}
        open={showEditForm}
        userInfo={userInfo}
      />
    </div>
  );
}
