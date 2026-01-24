import * as React from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Divider,
  Chip,
} from "@mui/material";

type ReportStatus = "รับเรื่องแล้ว" | "กำลังดำเนินการ" | "เสร็จสิ้น";

export default function TrackReportPage() {
  const [trackingCode, setTrackingCode] = React.useState("");
  const [result, setResult] = React.useState<null | {
    title: string;
    detail: string;
    status: ReportStatus;
    createdAt: string;
    updatedAt: string;
  }>(null);

  const handleSearch = () => {
    if (!trackingCode) return;

    // 🔌 mock data (ภายหลังเปลี่ยนเป็นเรียก API)
    setResult({
      title: "แจ้งไฟถนนดับ",
      detail: "ไฟถนนบริเวณหน้าวัดไม่สว่างในเวลากลางคืน",
      status: "กำลังดำเนินการ",
      createdAt: "10 ม.ค. 2569",
      updatedAt: "12 ม.ค. 2569",
    });
  };

  const statusColor = {
    รับเรื่องแล้ว: "info",
    กำลังดำเนินการ: "warning",
    เสร็จสิ้น: "success",
  } as const;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          ติดตามสถานะเรื่องร้องเรียน
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          กรุณากรอกรหัสติดตามเรื่องที่ได้รับหลังจากส่งรายงาน
        </Typography>

        {/* 🔍 INPUT */}
        <TextField
          fullWidth
          label="รหัสติดตามเรื่อง"
          placeholder="เช่น RP-2026-000123"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          onClick={handleSearch}
        >
          ตรวจสอบสถานะ
        </Button>

        {/* 📄 RESULT */}
        {result && (
          <>
            <Divider sx={{ my: 4 }} />

            <Chip
              label={result.status}
              color={statusColor[result.status]}
              sx={{ mb: 2 }}
            />

            <Typography fontWeight={600}>หัวข้อ: {result.title}</Typography>

            <Typography color="text.secondary" mb={2}>
              {result.detail}
            </Typography>

            <Typography variant="body2">
              วันที่แจ้ง: {result.createdAt}
            </Typography>
            <Typography variant="body2">
              อัปเดตล่าสุด: {result.updatedAt}
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
}
