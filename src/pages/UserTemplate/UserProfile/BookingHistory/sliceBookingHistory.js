import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../services/api";

export const fetchBookingHistory = createAsyncThunk(
  "bookingHistory/fetchBookingHistory",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`/dat-phong/lay-theo-nguoi-dung/${id}`);
      return result.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  historyList: {
    loading: false,
    status: "idle", // idle | success | faild
    data: [],
    error: null,
  },
};

const sliceBookingHistory = createSlice({
  name: "roomListSlice",
  initialState,
  reducers: {
    resetHistory: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingHistory.pending, (state) => {
        state.historyList.loading = true;
      })
      .addCase(fetchBookingHistory.fulfilled, (state, action) => {
        state.historyList.loading = false;
        state.historyList.data = action.payload;
        state.historyList.status = "success";
      })
      .addCase(fetchBookingHistory.rejected, (state, action) => {
        state.historyList.loading = false;
        state.historyList.error = action.payload;
        state.historyList.status = "faild";
      });
  },
});
export const bookingHistoryReducer = sliceBookingHistory.reducer;

export const {
  setDateRange,
  setRoom,
  setCountUser,
  resetBooking,
  resetHistory,
} = sliceBookingHistory.actions;
