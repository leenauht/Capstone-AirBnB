import { Avatar, Badge, List, message, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import api from "../../../../services/api";
import { IMG_DEFAULT } from "../../RoomDetails/ListComment/CommentInput";
import { toast } from "react-toastify";
import Camera from "./../../../../Icons/Camera";
import { CameraOutlined } from "@ant-design/icons";
import UpdateUserForm from "../../UpdateUserForm";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../../store/sliceUserInfo";
import { toastError, toastSuccess } from "../../../../utils";

export default function PresonalInfo() {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const formattedDate = useMemo(() => {
    if (!user?.birthday) return null;
    const date = new Date(user.birthday);
    return date.toLocaleDateString("vi-VN");
  }, [user]);

  const handleUpload = async ({ file }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("formFile", file);

    try {
      const response = await api.post("/users/upload-avatar", formData);
      if (response.content) {
        toastSuccess("Thay đổi avatar thành công!");
        dispatch(setUserInfo(response.content));
        setUser(response.content);
      }
    } catch (error) {
      toastError("Lỗi khi tải ảnh lên!");
    }
    setLoading(false);
  };

  const onShowEditForm = () => {
    setShowEditForm(true);
  };

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

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
                toastError("Chỉ được chọn file ảnh!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
            customRequest={({ file }) => handleUpload({ file })}
          >
            <Avatar
              size={60}
              icon={<img src={user?.avatar || IMG_DEFAULT} alt="logo" />}
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

        <span className="text-lg font-medium">{user?.name}</span>
      </div>
      <div className="bg-slate-200 p-5 rounded-xl">
        <List className="w-full" itemLayout="horizontal">
          <List.Item>
            <div className="flex gap-5">
              <span>UID:</span>
              <strong>{user?.id}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Email:</span>
              <strong>{user?.email}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Số điện thoại:</span>
              <strong>{user?.phone}</strong>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex gap-5">
              <span>Giới tính:</span>
              <strong>{user?.gender ? "Nam" : "Nữ"}</strong>
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
              <strong>{user?.role}</strong>
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
        setUser={setUser}
        open={showEditForm}
        user={user}
      />
    </div>
  );
}
