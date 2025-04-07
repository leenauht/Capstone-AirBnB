import { configureStore } from "@reduxjs/toolkit";
import { create } from "zustand";

import roomListReducer from "../pages/UserTemplate/RoomList/sliceRoomList";
import locationReducer from "../pages/UserTemplate/RoomList/sliceLocation";
import signupReducer from "../pages/UserTemplate/SignUpForm/slice";
import roomDetailReducer from "../pages/UserTemplate/RoomDetails/sliceRoomDetail";
import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
import userReducer from "./../pages/AdminTemplate/UserList/slice";
import locationsReducer from "./../pages/AdminTemplate/LocationList/slice";
import RoomManagementReducer from "./../pages/AdminTemplate/RoomManagement/slice";
import { bookingHistoryReducer } from "../pages/UserTemplate/UserProfile/BookingHistory/sliceBookingHistory";
import { userInfoReducer } from "./sliceUserInfo";

export const store = configureStore({
  reducer: {
    roomListReducer,
    locationReducer,
    signupReducer,
    roomDetailReducer,
    authReducer,
    userReducer,
    locationsReducer,
    RoomManagementReducer,
    bookingHistoryReducer,
    userInfoReducer,
  },
});

const useStore = create((set) => ({
  data: "Initial Data",
  setData: (newData) => set({ data: newData }),
}));

export default useStore;
