// components/CenterLoader.tsx
import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";

export default function CenterLoader({ open }: { open: boolean }) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.15)",
      }}
    >
      <Box textAlign="center">
        <CircularProgress size={55} thickness={4} />
        <Typography mt={2}>กำลังโหลด...</Typography>
      </Box>
    </Backdrop>
  );
}
