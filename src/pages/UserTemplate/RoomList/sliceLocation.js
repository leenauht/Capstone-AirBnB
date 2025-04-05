import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { buildDataLocation, filterLocation } from "./helper";

export const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
  async (__dirname, { rejectWithValue, getState }) => {
    const state = getState().locationReducer;
    if (state.data.length) {
      return state.data;
    }
    try {
      const result = await api.get("/vi-tri");
      return result.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
  dataSearch: [],
  keySearch: "",
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setKeySearch: (state, action) => {
      const keySearch = action.payload;
      const data = state.data;
      const dataFiltered = filterLocation(keySearch, data);
      state.keySearch = keySearch;
      state.dataSearch = dataFiltered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        const payload = buildDataLocation(action.payload);
        state.data = payload;
        state.dataSearch = filterLocation(state.keySearch, payload);
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;

export const { setLocationSearch, setKeySearch } = locationSlice.actions;
