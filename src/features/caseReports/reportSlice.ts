import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ================= TYPES ================= */

export type Report = {
  id: number;
  tracking_code: string;
  details: string;
  status: number;
  created_at: string;
  updated_at: string;
};

type ReportState = {
  list: Report[];
  loading: boolean;
  error: string | null;
};

/* ================= INITIAL ================= */

const initialState: ReportState = {
  list: [],
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchReportsThunk = createAsyncThunk<
  Report[],
  void,
  { rejectValue: string }
>("reports/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/v1/reports");
    return res.data.data as Report[];
  } catch {
    return rejectWithValue("โหลดรายการไม่สำเร็จ");
  }
});

/* ================= SLICE ================= */

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReportsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "error";
      });
  },
});

export default reportSlice.reducer;
