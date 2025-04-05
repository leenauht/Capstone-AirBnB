import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import DashboardPage from "./_component/AdminLayout";

export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData?.maLoaiNguoiDung === "KhachHang") {
      toast.warning("Bạn không có quyền truy cập trang này!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (!data) {
    return <Navigate to="/auth" />;
  }

  if (location.pathname === "/admin") {
    return <Navigate to="/admin/QuanLyNguoiDung" replace />;
  }

  return (
    <DashboardPage>
      <Outlet />
      <ToastContainer />
    </DashboardPage>
  );
}
