import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import ReportPage from "../pages/Reportpage";
import TrackReportPage from "../pages/Trackpage";
import LoginPage from "../pages/Loginpage";
import ProtectedRoute from "./protectedRoute";

import Dashboard from "../features/dashboard/dashboard";
import AuthRoute from "./authRoute";
import ReportListPage from "../features/caseReports/reportPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <ReportPage /> },
        { path: "report", element: <ReportPage /> },
        { path: "track", element: <TrackReportPage /> },
        {
          element: <ProtectedRoute />,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "reportsList", element: <ReportListPage /> },
          ],
        },
      ],
    },
    {
      element: <AuthRoute />,
      children: [{ path: "login", element: <LoginPage /> }],
    },
  ],
  {
    basename: "/drugnarco",
  },
);

export default router;
