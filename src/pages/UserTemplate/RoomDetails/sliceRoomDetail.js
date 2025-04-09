import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { getDiffDays } from "../../../utils";

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

export const bookingRoom = createAsyncThunk(
  "roomDetail/bookingRoom",
  async (_, { rejectWithValue, getState }) => {
    const { roomDetailReducer, userInfoReducer } = getState();
    const { dateRange, countUser, data } = roomDetailReducer;
    const [fromDate, toDate] = dateRange;
    const { userInfo } = userInfoReducer;

    const payload = {
      maPhong: data.id,
      ngayDen: new Date(fromDate).toISOString(),
      ngayDi: new Date(toDate).toISOString(),
      soLuongKhach: countUser,
      maNguoiDung: userInfo?.id,
    };
    try {
      const result = await api.post("/dat-phong", payload);
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
  dateRange: [],
  price: 0,
  serviceFee: 1_000_000,
  total: 0,
  diffDays: 0,
  countUser: 1,
  surcharge: 0,
  unitSurcharge: 100_000,
  bookingStatus: {
    loading: false,
    status: "idle", // idle | success | faild
    data: null,
    error: null,
  },
};

const roomDetailSlice = createSlice({
  name: "roomListSlice",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
      if (action.payload.length === 2) {
        const [startDay, endDay] = action.payload;
        state.diffDays = getDiffDays(startDay, endDay);
      } else {
        state.diffDays = 0;
      }
      const price = state.data?.giaTien * state.diffDays;
      state.price = price;
      state.total = state.price + state.serviceFee + state.surcharge;
    },
    setCountUser: (state, action) => {
      const count = action.payload;
      state.countUser = count;
      if (count > 1) {
        state.surcharge = (count - 1) * state.unitSurcharge;
        state.total = state.price + state.serviceFee + state.surcharge;
      }
    },
    resetBooking: (state) => {
      state.bookingStatus = {
        loading: false,
        status: "idle", // idle | success | faild
        data: null,
        error: null,
      };
    },
  },
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
      })

      .addCase(bookingRoom.pending, (state) => {
        state.bookingStatus.loading = true;
      })
      .addCase(bookingRoom.fulfilled, (state, action) => {
        state.bookingStatus.loading = false;
        state.bookingStatus.status = "success";
        state.bookingStatus.data = action.payload;
        state.dateRange = initialState.dateRange;
        state.total = initialState.total;
        state.price = initialState.price;
        state.countUser = initialState.countUser;
        state.diffDays = initialState.diffDays;
        state.surcharge = initialState.surcharge;
      })
      .addCase(bookingRoom.rejected, (state, action) => {
        state.bookingStatus.loading = false;
        state.bookingStatus.status = "faild";
        state.bookingStatus.error = action.payload;
      });
  },
});

export default roomDetailSlice.reducer;
export const roomDetailsReducer = roomDetailSlice.reducer;

export const { setDateRange, setRoom, setCountUser, resetBooking } =
  roomDetailSlice.actions;
