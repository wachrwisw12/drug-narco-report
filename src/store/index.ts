import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import reportSlice from "../features/caseReports/reportSlice";
import uiReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportSlice,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
