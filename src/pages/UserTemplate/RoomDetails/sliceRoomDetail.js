import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchRoomDetail = createAsyncThunk(
  "roomDetail/fetchRoomDetail",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`/phong-thue/${id}`);
      return result.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const roomDetailSlice = createSlice({
  name: "roomListSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoomDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRoomDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomDetailSlice.reducer;
