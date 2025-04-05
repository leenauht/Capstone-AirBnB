import { Outlet, useNavigate } from "react-router-dom";
import Header from "./_component/Header";
import Footer from "./_component/Footer";
import { ToastContainer } from "react-toastify";
import SimpleMap from "./Map";

export default function UserTemplate() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
      {/* <SimpleMap></SimpleMap> */}

      <Footer />
    </div>
  );
}
