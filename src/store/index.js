import { configureStore } from "@reduxjs/toolkit";
import roomListReducer from "../pages/UserTemplate/RoomList/sliceRoomList";
import locationReducer from "../pages/UserTemplate/RoomList/sliceLocation";
import signupReducer from "../pages/UserTemplate/SignUpForm/slice";
import roomDetailReducer from "../pages/UserTemplate/RoomDetails/sliceRoomDetail";

export const store = configureStore({
  reducer: {
    roomListReducer,
    locationReducer,
    signupReducer,
    roomDetailReducer,
  },
});
