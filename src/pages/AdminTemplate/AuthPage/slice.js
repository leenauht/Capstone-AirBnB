import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Async action để đăng nhập
export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", user);

      const content = response?.content;
      if (!content || !content.user || !content.token) {
        throw new Error("Phản hồi từ server không hợp lệ.");
      }

      const { user: userInfo, token } = content;

      // Kiểm tra quyền truy cập
      if (userInfo.role === "USER") {
        return rejectWithValue("Bạn không có quyền truy cập trang này.");
      }

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("accessToken", token);

      return { userInfo, accessToken: token };
    } catch (error) {
      console.error("❌ Login Error:", error);

      if (error.response) {
        const message = error.response.data?.message || "Đăng nhập thất bại!";
        return rejectWithValue(message);
      }

      return rejectWithValue("Lỗi kết nối. Vui lòng thử lại!");
    }
  }
);

// Lấy dữ liệu từ localStorage khi load lại trang
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const accessToken = localStorage.getItem("accessToken") || null;

const initialState = {
  loading: false,
  data: userInfo ? { userInfo, accessToken } : null,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
