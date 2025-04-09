import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Lấy danh sách người dùng
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { pageIndex = 1, pageSize = 10, search = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${search}`
      );

      if (!response?.content?.data || !Array.isArray(response.content.data)) {
        throw new Error("Dữ liệu API không hợp lệ");
      }

      return {
        data: response.content.data,
        pageIndex: response.content.pageIndex,
        pageSize: response.content.pageSize,
        totalRow: response.content.totalRow,
      };
    } catch {
      return rejectWithValue("Lỗi khi lấy danh sách người dùng");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      if (!response?.content || !Array.isArray(response.content)) {
        throw new Error("Dữ liệu API không hợp lệ");
      }
      return response.content;
    } catch (error) {
      return rejectWithValue(
        error.message || "Lỗi khi tải danh sách người dùng"
      );
    }
  }
);

// ✅ Thêm người dùng mới
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      await api.post("/users", userData);
      dispatch(fetchUsers({ pageIndex: 1, pageSize: 10 }));
    } catch {
      return rejectWithValue("Lỗi khi thêm người dùng");
    }
  }
);

// ✅ Cập nhật người dùng
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { id, ...payload } = userData;
      const response = await api.put(`/users/${id}`, payload);

      if (!response?.content) {
        throw new Error("API không trả về dữ liệu hợp lệ");
      }
      return response.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi cập nhật người dùng"
      );
    }
  }
);

// ✅ Xóa người dùng
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/users?id=${userId}`);
      dispatch(fetchUsers({ pageIndex: 1, pageSize: 10 }));
    } catch {
      return rejectWithValue("Lỗi khi xóa người dùng");
    }
  }
);

// ✅ Upload ảnh đại diện
export const uploadAvatar = createAsyncThunk(
  "users/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      if (!file) throw new Error("Không có file để upload!");

      const formData = new FormData();
      formData.append("formFile", file);

      const response = await api.post("/users/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response?.content?.avatar) {
        const errorMessage = "Không nhận được URL ảnh từ API";
        console.error("🚨 Lỗi API:", errorMessage);
        return rejectWithValue({
          message: errorMessage,
          response,
        });
      }

      return response.content;
    } catch (error) {
      console.error("🚨 Lỗi upload ảnh:", error);
      return rejectWithValue({
        message: error.message || "Lỗi khi upload ảnh",
        error,
      });
    }
  }
);

const initialState = {
  data: [],
  userInfo: {},
  loading: false,
  error: null,
  pagination: { pageIndex: 1, pageSize: 10, totalRow: 0 },
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.search = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = {
          pageIndex: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          totalRow: action.payload.totalRow,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        if (!updatedUser?.id) {
          return;
        }
        state.data = state.data.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.avatar) {
          state.userInfo = {
            ...state.userInfo,
            avatar: action.payload.avatar,
          };
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setPagination } = userSlice.actions;
export default userSlice.reducer;
