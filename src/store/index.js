import { configureStore } from "@reduxjs/toolkit";
import roomListReducer from "../pages/UserTemplate/RoomList/sliceRoomList";
import locationReducer from "../pages/UserTemplate/RoomList/sliceLocation";

export const store = configureStore({
  reducer: {
    roomListReducer,
    locationReducer,
  },
});
