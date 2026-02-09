import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import reportSlice from "../features/caseReports/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
