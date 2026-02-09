import { Backdrop, CircularProgress } from "@mui/material";

export default function PageOverlayLoader({ open }: { open: boolean }) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(255,255,255,0.4)", // ทำให้จาง
        backdropFilter: "blur(2px)", // เบลอ
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
}
