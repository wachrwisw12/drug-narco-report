import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { User } from "../../types/user";

/* ================== TYPES ================== */
const guestUser: User = {
  id: 0,
  username: "guest",
  fullname: "Guest",
  role_id: 0, // role = guest
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

/* ================== INITIAL STATE ================== */
const tokenFromStorage = localStorage.getItem("access_token");

const initialState: AuthState = {
  isAuthenticated: !!tokenFromStorage,
  user: guestUser,
  token: tokenFromStorage,
  loading: false,
  error: null,
};

/* ================== LOGIN ================== */
export const loginThunk = createAsyncThunk<
  { user: User; token: string },
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/singin", payload);

    return {
      user: res.data.user,
      token: res.data.token,
    };
  } catch {
    return rejectWithValue("เข้าสู่ระบบไม่สำเร็จ");
  }
});

/* ================== VERIFY TOKEN ================== */
export const verifyTokenThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: null }
>("auth/verify", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/auth/me");
    return res.data.user; // backend ควรคืน user
  } catch {
    return rejectWithValue(null);
  }
});

/* ================== SLICE ================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = guestUser;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== LOGIN ===== */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("access_token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "login error";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("access_token");
      })

      /* ===== VERIFY ===== */
      .addCase(verifyTokenThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyTokenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyTokenThunk.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("access_token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
