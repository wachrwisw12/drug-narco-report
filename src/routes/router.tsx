import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import ReportPage from "../pages/Reportpage";
import TrackReportPage from "../pages/Trackpage";
import LoginPage from "../features/auth/Loginpage";
import ProtectedRoute from "./protectedRoute";

import Dashboard from "../features/dashboard/dashboard";
import AuthRoute from "./authRoute";
import ReportListPage from "../features/caseReports/reportPage";
import ReportDetail from "../features/caseReports/reportDetail";

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
            {
              path: "reportsList",
              children: [
                {
                  index: true,
                  element: <ReportListPage />,
                },
                {
                  path: ":id",
                  element: <ReportDetail />,
                },
              ],
            },
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
    basename: "/",
  },
);

export default router;
