import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (
    { pageIndex = 1, pageSize = 10, search = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${search}`
      );

      // Kiểm tra dữ liệu trả về có đúng format không
      if (!response?.content?.data || !Array.isArray(response.content.data)) {
        throw new Error("Dữ liệu API không hợp lệ");
      }

      return {
        data: response.content.data,
        pageIndex: response.content.pageIndex,
        pageSize: response.content.pageSize,
        totalRow: response.content.totalRow,
      };
    } catch (error) {
      console.error("Lỗi API:", error);
      return rejectWithValue(
        error.response?.message || "Lỗi khi lấy danh sách phòng"
      );
    }
  }
);

export const addRoom = createAsyncThunk(
  "rooms/addLocation",
  async (newLocation, { rejectWithValue, dispatch }) => {
    try {
      await api.post("/phong-thue", newLocation);
      dispatch(fetchRooms({ pageIndex: 1, pageSize: 10 }));
    } catch {
      return rejectWithValue("Lỗi khi thêm vị trí");
    }
  }
);

export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async (updatedData, { rejectWithValue }) => {
    try {
      const { id, ...payload } = updatedData;
      const response = await api.put(`/phong-thue/${id}`, payload);
      if (!response?.content) {
        throw new Error("API không trả về dữ liệu hợp lệ");
      }
      return response.content;
    } catch {
      return rejectWithValue("Lỗi khi cập nhật vị trí");
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/phong-thue/${id}`);
      dispatch(fetchRooms({ pageIndex: 1, pageSize: 10 }));
    } catch {
      return rejectWithValue("Lỗi khi xóa phòng");
    }
  }
);

export const uploadRoomImage = createAsyncThunk(
  "rooms/uploadRoomImage",
  async ({ maPhong, file }, { rejectWithValue, dispatch }) => {
    try {
      if (!maPhong || !file) {
        throw new Error("Thiếu mã phòng hoặc file ảnh!");
      }

      const formData = new FormData();
      formData.append("formFile", file); 

      const response = await api.post(
        `/phong-thue/upload-hinh-phong?maPhong=${maPhong}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (!response?.content) {
        throw new Error("Không thể tải ảnh lên");
      }

      dispatch(fetchRooms({ pageIndex: 1, pageSize: 10 }));
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
  rooms: [],
  loading: false,
  error: null,
  pagination: { pageIndex: 1, pageSize: 10, totalRow: 0 },
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.data;
        state.pagination = {
          pageIndex: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          totalRow: action.payload.totalRow,
        };
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoom.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadRoomImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadRoomImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadRoomImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setPagination } = roomSlice.actions;
export default roomSlice.reducer;
