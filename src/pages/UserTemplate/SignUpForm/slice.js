import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const actSignup = createAsyncThunk(
  "signup/actSignup",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.post("/auth/signup");
      return result.data.content;
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

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(actSignup.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(actSignup.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default signUpSlice.reducer;
