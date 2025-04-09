import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Thực thi gọi API để tải danh sách phòng
export const fetchBookingRooms = createAsyncThunk(
  "booking/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dat-phong");
      const fullData = response.content || [];
      if (fullData.length === 0) {
        return rejectWithValue("Không có dữ liệu phòng");
      }
      return fullData;
    } catch (error) {
      console.error("Lỗi API:", error);
      if (error.code === "ERR_NETWORK") {
        return rejectWithValue("Lỗi mạng, vui lòng thử lại.");
      }
      return rejectWithValue(error.message || "Có lỗi xảy ra khi tải dữ liệu.");
    }
  }
);

// Async thunk thêm phòng mới
export const addRoom = createAsyncThunk(
  "booking/addRoom",
  async (newRoom, { rejectWithValue }) => {
    try {
      const response = await api.post("/dat-phong", newRoom);
      return response.content;
    } catch (error) {
      console.error("Lỗi thêm phòng:", error);
      return rejectWithValue(error.message || "Có lỗi xảy ra khi thêm phòng.");
    }
  }
);

// Async thunk cập nhật phòng (chỉnh sửa)
export const updateRoom = createAsyncThunk(
  "booking/updateRoom",
  async ({ id, ...updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/dat-phong/${id}`, updatedData);
      // Giả sử response.content chứa phòng đã được cập nhật
      return response.content;
    } catch (error) {
      console.error("Lỗi cập nhật phòng:", error);
      return rejectWithValue(
        error.message || "Có lỗi xảy ra khi cập nhật phòng."
      );
    }
  }
);

// Async thunk xóa phòng
export const deleteRoom = createAsyncThunk(
  "booking/deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/dat-phong/${id}`);
      // Trả về id của phòng đã bị xóa để cập nhật state
      return id;
    } catch (error) {
      console.error("Lỗi xóa phòng:", error);
      return rejectWithValue(error.message || "Có lỗi xảy ra khi xóa phòng.");
    }
  }
);

const initialState = {
  bookingRooms: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "BookingRoomReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchRooms
      .addCase(fetchBookingRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchBookingRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addRoom
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateRoom
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        // Tìm phòng theo id và cập nhật lại
        const index = state.bookingRooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (index !== -1) {
          state.bookingRooms[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteRoom
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingRooms = state.bookingRooms.filter(
          (room) => room.id !== action.payload
        );
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
