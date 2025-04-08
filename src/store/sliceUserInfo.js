import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`/users/${id}`);
      return result.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export const userInfoReducer = userInfoSlice.reducer;

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;
