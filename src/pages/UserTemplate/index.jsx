import { Outlet } from "react-router-dom";
import Header from "./_component/Header";
import Footer from "./_component/Footer";
import { ToastContainer } from "react-toastify";
import ChatBox from "./ChatBox";
import Cookies from "js-cookie";
import { decodeJWT } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo } from "../../store/sliceUserInfo";

export default function UserTemplate() {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    const data = decodeJWT(token);

    if (data?.id) {
      dispatch(fetchUserInfo(data.id));
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
      {/* <SimpleMap></SimpleMap> */}
      <ChatBox />
      <Footer />
    </div>
  );
}
