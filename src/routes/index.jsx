import { Route } from "react-router-dom";
import UserTemplate from "../pages/UserTemplate";
import HomePage from "../pages/UserTemplate/HomePage";
import RoomDetail from "../pages/UserTemplate/RoomDetails";
import Account from "../pages/UserTemplate/UserProfile/Account";
import Payment from "../pages/UserTemplate/RoomDetails/Booking/Payment";
import RoomLocation from "../pages/UserTemplate/RoomLocation";

import AdminTemplate from "../pages/AdminTemplate";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import UserInfoPage from "../pages/AdminTemplate/UserInfoPage";
import UserList from "../pages/AdminTemplate/UserList";
import LocationList from "../pages/AdminTemplate/LocationList";
import RoomManagement from "../pages/AdminTemplate/RoomManagement";

const routes = [
  {
    path: "",
    element: UserTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "detail",
        element: RoomDetail,
      },
      {
        path: "user-profile",
        element: Account,
      },
      {
        path: "detail/:id/payment",
        element: Payment,
      },
    ],
  },
  {

    path: "search",
    element: RoomLocation,
  },
  {
    path: "admin",
    element: AdminTemplate,
    children: [
      {
        path: "thong-tin-ca-nhan",
        element: UserInfoPage,
      },
      {
        path: "QuanLyNguoiDung/:pageIndex?",
        element: UserList,
      },
      {
        path: "QuanLyThongTinViTri/:pageIndex?",
        element: LocationList,
      },
      {
        path: "QuanLyThongTinPhong/:pageIndex?",
        element: RoomManagement,
      },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              />
            );
          })}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
