import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { CaseReport } from "../../types/report";

/* ================= TYPES ================= */

type ReportState = {
  count: number;
  list: CaseReport[];
  loading: boolean;
  error: string | null;
};

type FetchReportsResponse = {
  list: CaseReport[];
  count: number;
};

/* ================= INITIAL ================= */

const initialState: ReportState = {
  count: 0,
  list: [],
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchReportsThunk = createAsyncThunk<
  FetchReportsResponse,
  void,
  { rejectValue: string }
>("reports/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/v1/case-reports");

    return {
      list: res.data.data,
      count: res.data.count,
    };
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
        state.list = action.payload.list;
        state.count = action.payload.count;
      })
      .addCase(fetchReportsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "error";
      });
  },
});

export default reportSlice.reducer;
