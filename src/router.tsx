import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Homepage";
import MainLayout from "./layout/MainLayout";
import ReportPage from "./pages/Reportpage";
import TrackReportPage from "./pages/Trackpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "report", element: <ReportPage /> },
      { path: "track", element: <TrackReportPage /> },
    ],
  },
  //   {
  //     path: '/login',
  //     element: <Login />,
  //   },
]);

export default router;
