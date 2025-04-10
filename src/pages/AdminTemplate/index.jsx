import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import DashboardPage from "./_component/AdminLayout";

export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!data) {
      navigate("/auth", { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/auth", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <DashboardPage>
      <Outlet />
      <ToastContainer />
    </DashboardPage>
  );
}
