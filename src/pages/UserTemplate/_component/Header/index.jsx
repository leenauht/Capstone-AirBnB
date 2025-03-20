import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../../../Icons/Logo";
import Profile from "../../UserProfile";
// import Profile from "./Profile";

export default function Header() {
  //   const state = useSelector((state) => state.signInReducer);

  const navList = [{ to: "/", name: "Trang Chủ" }];

  const renderNavList = () => {
    return navList.map((item) => {
      return (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) => (isActive ? "text-blue-600" : "")}
          >
            {item.name}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <nav className="fixed w-full z-50 bg-bg-opacity-4 shadow-box-shadow-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo color="red" width={102} height={32} />
        </NavLink>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium text-white text-lg flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {renderNavList()}
          </ul>
        </div>
        <Profile />
      </div>
    </nav>
  );
}
