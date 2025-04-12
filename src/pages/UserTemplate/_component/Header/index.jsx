import { NavLink } from "react-router-dom";
import Logo from "../../../../Icons/Logo";
import Profile from "../../UserProfile";
import Home from "../../../../Icons/Home";
import useValidationStore from "../useValidationStore.jsx";
import { useDispatch } from "react-redux";
import { resetBooking } from "../../RoomDetails/sliceRoomDetail.js";

export default function Header(props) {
  const navList = [{ to: "/", name: "Trang Chủ" }];
  const triggerReset = useValidationStore((state) => state.triggerReset);
  const dispatch = useDispatch();

  const renderNavList = () => {
    return navList.map((item) => {
      return (
        <li key={item.to}>
          <NavLink
            to={item.to}
            onClick={() => {
              window.scrollTo(0, 0);
              triggerReset();
              dispatch(resetBooking());
            }}
            className="text-black hover:text-blue-500 transition duration-300"
          >
            <div className="flex items-end gap-1">
              <Home />
              <span>{item.name}</span>
            </div>
          </NavLink>
        </li>
      );
    });
  };

  return (
    <nav className="fixed w-full z-[1000] bg-bg-opacity-4 shadow-box-shadow-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <NavLink
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
            triggerReset();
            dispatch(resetBooking());
          }}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo color="red" width={102} height={32} text={true} />
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
