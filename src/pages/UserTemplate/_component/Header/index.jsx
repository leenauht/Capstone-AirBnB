import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../../../Icons/Logo";

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
    <nav className="bg-bg-opacity-1 fixed w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo color="red" width={102} height={32} />
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium text-white text-lg flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {renderNavList()}
            {/* {!state.data && (
              <Button to={"/sign-in"} name={"Sign In"} color={"bg-red-700"} />
            )}
            {!state.data && (
              <Button to={"/sign-up"} name={"Sign Up"} color={"bg-blue-700"} />
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
