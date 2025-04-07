import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardPage from "./_component/AdminLayout";
import { setUser } from "./AuthPage/slice";

export default function AdminTemplate() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("userInfo"));
    if (!data && localUser) {
      dispatch(setUser(localUser));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData?.role === "USER") {
      toast.warning("Bạn không có quyền truy cập trang này!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [navigate]);

  useEffect(() => {
    if (!data) {
      navigate("/auth", { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/QuanLyNguoiDung/1", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <DashboardPage>
      <Outlet />
      <ToastContainer />
    </DashboardPage>
  );
}
