import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/Appbar";
import { Box } from "@mui/material";

export default function MainLayout() {
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f2f3f7 0%, #e3e8eb 100%)",
          py: 6,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
