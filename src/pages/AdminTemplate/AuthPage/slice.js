import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Async action để đăng nhập
export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", user);

      // Lấy dữ liệu từ `content`
      const content = response?.content;
      if (!content || !content.user || !content.token) {
        throw new Error("Phản hồi từ server không hợp lệ.");
      }

      const { user: userInfo, token  } = content;

      // Kiểm tra quyền truy cập
      if (userInfo.role === "USER") {
        return rejectWithValue("Bạn không có quyền truy cập trang này.");
      }

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("accessToken", token);

      return { userInfo, accessToken: token };
    } catch (error) {
      console.error("❌ Login Error:", error);

      if (error.response?.status === 400) {
        return rejectWithValue("Email hoặc mật khẩu không đúng!");
      }

      return rejectWithValue(
        error.message || "Đăng nhập thất bại! Vui lòng thử lại."
      );
    }
  }
);

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  data: userInfo ? { userInfo } : null,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.data = null;
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
