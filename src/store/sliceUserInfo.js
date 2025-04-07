import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  status: "idle",
  userInfo: null,
  error: null,
};

const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    resetUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const userInfoReducer = userInfoSlice.reducer;

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;
