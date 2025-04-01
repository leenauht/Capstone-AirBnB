import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Lấy danh sách vị trí (có phân trang & tìm kiếm)
export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (
    { pageIndex = 1, pageSize = 10, search = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${search}`
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
      return rejectWithValue("Lỗi khi lấy danh sách vị trí");
    }
  }
);

// Thêm vị trí mới
export const addLocation = createAsyncThunk(
  "locations/addLocation",
  async (newLocation, { rejectWithValue, dispatch }) => {
    try {
      await api.post("/vi-tri", newLocation);
      dispatch(fetchLocations({ pageIndex: 1, pageSize: 10 }));
    } catch {
      return rejectWithValue("Lỗi khi thêm vị trí");
    }
  }
);

// Cập nhật vị trí
export const updateLocation = createAsyncThunk(
  "locations/updateLocation",
  async (updatedData, { rejectWithValue }) => {
    try {
      const { id, ...payload } = updatedData;
      const response = await api.put(`/vi-tri/${id}`, payload);
      if (!response?.content) {
        throw new Error("API không trả về dữ liệu hợp lệ");
      }
      return response.content;
    } catch {
      return rejectWithValue("Lỗi khi cập nhật vị trí");
    }
  }
);

// Xóa vị trí
export const deleteLocation = createAsyncThunk(
  "locations/deleteLocation",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/vi-tri/${id}`);
      dispatch(fetchLocations({ pageIndex: 1, pageSize: 10 }));
    } catch {
      return rejectWithValue("Lỗi khi xóa vị trí");
    }
  }
);

// Upload hình ảnh cho vị trí
export const uploadLocationImage = createAsyncThunk(
  "locations/uploadLocationImage",
  async ({ maViTri, file }, { rejectWithValue, dispatch }) => {
    try {
      if (!maViTri || !file) {
        throw new Error("Thiếu mã vị trí hoặc file ảnh!");
      }

      const formData = new FormData();
      formData.append("formFile", file); // 🔥 Đúng key theo API Swagger

      const response = await api.post(
        `/vi-tri/upload-hinh-vitri?maViTri=${maViTri}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (!response?.content) {
        throw new Error("Không thể tải ảnh lên");
      }

      dispatch(fetchLocations({ pageIndex: 1, pageSize: 10 }));
      return response.content;
    } catch (error) {
      console.error(
        "❌ Lỗi upload ảnh:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải ảnh lên"
      );
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  pagination: { pageIndex: 1, pageSize: 10, totalRow: 0 },
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.search = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = {
          pageIndex: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          totalRow: action.payload.totalRow,
        };
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLocation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadLocationImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadLocationImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadLocationImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setPagination } = locationSlice.actions;
export default locationSlice.reducer;
