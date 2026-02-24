import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { CaseReport } from "../../types/report";

/* ================= TYPES ================= */

type ReportState = {
  count: number;
  list: CaseReport[];
  selected: CaseReport | null;
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
  selected: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchReportsThunk = createAsyncThunk<
  FetchReportsResponse,
  { status?: number },
  { rejectValue: string }
>("reports/fetch", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get("/v1/case-reports", {
      params: {
        status: params?.status,
      },
    });

    return {
      list: res.data.data,
      count: res.data.count,
    };
  } catch {
    return rejectWithValue("โหลดรายการไม่สำเร็จ");
  }
});
/* ================== LOGIN ================== */
export const fetchReportByIdThunk = createAsyncThunk<
  CaseReport,
  string,
  { rejectValue: string }
>("reports/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/v1/case-reports/${id}`);
    return res.data.data;
  } catch {
    return rejectWithValue("โหลดข้อมูลไม่สำเร็จ");
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
    builder
      .addCase(fetchReportByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload; // 👈 เก็บ detail
      })
      .addCase(fetchReportByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "error";
      });
  },
});

export default reportSlice.reducer;
