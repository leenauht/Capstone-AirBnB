import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchRoomList = createAsyncThunk(
  "roomList/fetchRoomList",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/phong-thue");
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

const roomListSlice = createSlice({
  name: "roomListSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoomList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRoomList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomListSlice.reducer;
