import { useRef, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useOutsideClick } from "../../../Hooks/useClickUotSide";
import Menu from "../../../Icons/Menu";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
import { toast } from "react-toastify";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Profile() {
  const [showMenu, setShowMenu] = useState(false);
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [showSignupLogin, setShowSignupLogin] = useState(false);
  const menuWapperElm = useRef(null);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useOutsideClick(menuWapperElm, () => {
    setShowMenu(false);
  });

  const handleLogOut = () => {
    localStorage.removeItem("userInfo", "");
    toast.success("Bạn đã đăng xuất!", {
      autoClose: 2000,
    });
    setShowMenu((pre) => !pre);
    window.scrollTo(0, 0);
  };

  const toggleMenu = () => {
    setShowMenu((pre) => !pre);
  };

  const onShowLoginForm = () => {
    setShowFormLogin(true);
    setShowMenu(false);
  };

  const onShowSignupForm = () => {
    setShowSignupLogin(true);
    setShowMenu(false);
  };

  const data = localStorage.getItem("userInfo");

  return (
    <>
      <div className="relative" ref={menuWapperElm}>
        <div
          onClick={toggleMenu}
          className="flex justify-center items-center gap-2 py-1 px-5 border rounded-full cursor-pointer"
        >
          <Menu />
          <Avatar size={40} icon={<UserOutlined />} />
        </div>

        {/* Dropdown menu */}
        {showMenu && (
          <div className="z-10 absolute right-0 mt-1 bg-slate-300 divide-y divide-gray-200 rounded-lg shadow-sm w-44">
            {localStorage.getItem("userInfo") && (
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/user-profile"
                className="flex py-2 px-4 gap-2 items-center text-sm text-gray-900 cursor-pointer"
              >
                <div className="font-medium truncate">Tài khoản</div>
              </NavLink>
            )}

            {!localStorage.getItem("userInfo") && (
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
                <li
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onShowLoginForm}
                >
                  Đăng nhập
                </li>

                <li
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onShowSignupForm}
                >
                  Đăng ký
                </li>
              </ul>
            )}

            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li>
                <NavLink
                  to="/admin"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  CMS Admin
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Cài đặt
                </a>
              </li>
            </ul>
            {localStorage.getItem("userInfo") && (
              <div className="py-1">
                <NavLink
                  onClick={handleLogOut}
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Đăng xuất
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
      <SignInForm
        setOpen={setShowFormLogin}
        open={showFormLogin}
        setIsOpenFormSignup={setShowSignupLogin}
      />

      <SignUpForm
        setOpen={setShowSignupLogin}
        open={showSignupLogin}
        setIsOpenFormSignin={setShowFormLogin}
      />
    </>
  );
}
