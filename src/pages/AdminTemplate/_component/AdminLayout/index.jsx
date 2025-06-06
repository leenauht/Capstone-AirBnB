import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  LogoutOutlined,
  HomeOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../../AuthPage/slice";

export default function AdminLayout({ children }) {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Lấy thông tin người dùng từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo(parsedUser);
        if (parsedUser?.name) setName(parsedUser.name);
      } catch (error) {
        console.error("❌ Lỗi parse userInfo:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Hiển thị thông báo đăng xuất trước
    toast.success("Đăng xuất thành công!", {
      position: "bottom-right",
      autoClose: 1500,
      theme: "colored",
    });

    // Sau khi hiển thị toast, chờ một chút rồi xóa localStorage và thực hiện logout
    setTimeout(() => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");

      dispatch(logout());

      // Điều hướng sau khi xử lý logout xong
      navigate("/auth");
    }, 2000);
  };

  const menuItems = useMemo(
    () => [
      {
        key: "/admin/QuanLyNguoiDung/1",
        icon: <UserOutlined />,
        label: "Quản Lý Người Dùng",
      },
      {
        key: "/admin/QuanLyThongTinViTri/1",
        icon: <HomeOutlined />,
        label: "Quản Lý Thông Tin Vị Trí",
      },
      {
        key: "/admin/QuanLyThongTinPhong/1",
        icon: <VideoCameraOutlined />,
        label: "Quản Lý Thông Tin Phòng",
      },
      {
        key: "/admin/QuanLyDatPhong",
        icon: <CalendarOutlined />,
        label: "Quản Lý Đặt Phòng",
      },
    ],
    []
  );

  const selectedKey = useMemo(() => {
    if (location.pathname.includes("/QuanLyNguoiDung")) {
      return "/admin/QuanLyNguoiDung/1";
    } else if (location.pathname.includes("/QuanLyThongTinViTri")) {
      return "/admin/QuanLyThongTinViTri/1";
    } else if (location.pathname.includes("/QuanLyThongTinPhong")) {
      return "/admin/QuanLyThongTinPhong/1";
    } else if (location.pathname.includes("/QuanLyDatPhong")) {
      return "/admin/QuanLyDatPhong";
    }
    return null;
  }, [location.pathname]);

  return (
    <>
      <Layout style={{ transition: "all 0.2s" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          collapsedWidth={80}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          <div
            className="logo"
            style={{ color: "white", textAlign: "center", padding: "10px 0" }}
          >
            {!collapsed ? "DASHBOARD" : "AirBnB"}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKey}
            onClick={({ key }) => key.startsWith("/admin") && navigate(key)}
            items={menuItems}
          />
        </Sider>
        <Layout
          style={{ marginLeft: collapsed ? 80 : 250, transition: "all 0.2s" }}
        >
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              width: "100%",
              padding: "0 20px",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
            <Dropdown
              menu={{
                items: [
                  {
                    key: "info",
                    label: "Thông tin cá nhân",
                    icon: <UserOutlined />,
                    onClick: () => navigate("/admin/thong-tin-ca-nhan"),
                  },
                  {
                    key: "home",
                    label: "Trang người dùng",
                    icon: <DoubleLeftOutlined />,
                    onClick: () => navigate("/"),
                  },
                  {
                    key: "logout",
                    label: "Đăng xuất",
                    icon: <LogoutOutlined />,
                    onClick: handleLogout,
                  },
                ],
              }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  src={userInfo?.avatar || undefined}
                  icon={!userInfo?.avatar && <UserOutlined />}
                />
                <span>{name}</span>
              </Space>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "18px 14px",
              padding: 12,
              minHeight: "calc(100vh - 64px - 48px)",
              background: "#fff",
              borderRadius: "8px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
