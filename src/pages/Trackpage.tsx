import * as React from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import { trackingSearch } from "../services/tracking.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { formatDateTHBE, timeAgo } from "../utils/date";
import statusColor from "../utils/status_colors";

export default function TrackReportPage() {
  // const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [trackingCode, setTrackingCode] = React.useState("");
  const [searched, setSearched] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<null | {
    title: string;
    details: string;
    status: string;
    name_status: string;
    created_at: string;
    updated_at: string;
    files?: {
      id: number;
      object_key: string;
      file_name: string;
      file_type: string;
      file_size: number;
      created_at: string;
      stream_url: string;
    }[];
  }>(null);

  React.useEffect(() => {
    console.log("loading changed:", loading);
  }, [loading]);

  const handleSubmit = async () => {
    if (!trackingCode) return;
    setLoading(true);
    setSearched(true);

    try {
      const res = await trackingSearch(trackingCode);
      if (res.success) {
        setResult(res.data);
      } else {
        setResult(null);
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 404) {
        setResult(null);
        toast.error("ไม่พบรหัสติดตามนี้");
      } else {
        toast.error("ระบบขัดข้อง");
      }
    } finally {
      setLoading(false);
    }
  };

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
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "กำลังค้นหา..." : "ตรวจสอบสถานะ"}
        </Button>
        {/* ❗ EMPTY STATE */}
        {searched && !loading && !result && (
          <Paper
            variant="outlined"
            sx={{
              mt: 4,
              p: 3,
              textAlign: "center",
              bgcolor: "#fafafa",
            }}
          >
            <Typography variant="h6" gutterBottom>
              🔍 ไม่พบข้อมูล
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ไม่พบรหัสติดตามที่คุณกรอก กรุณาตรวจสอบอีกครั้ง
              หรือรอการอัปเดตจากเจ้าหน้าที่
            </Typography>
          </Paper>
        )}
        {/* 📄 RESULT */}

        {result && (
          <>
            <Divider sx={{ my: 4 }} />

            <Chip
              label={result.name_status}
              color={statusColor[result.status]}
              sx={{ mb: 2 }}
            />

            <Typography fontWeight={600}>หัวข้อ: {result.title}</Typography>

            <Typography color="text.secondary" mb={2}>
              {result.details}
            </Typography>
            {result.files && result.files.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography fontWeight={600} mb={2}>
                  รูปประกอบเหตุการณ์
                </Typography>

                {result.files.map((f) => (
                  <img
                    key={f.id}
                    src={`${f.stream_url}`}
                    style={{ maxWidth: 300 }}
                  />
                ))}
              </>
            )}

            <Typography variant="body2" component="div">
              วันที่แจ้ง: {formatDateTHBE(result.created_at)}{" "}
              <Box component="span" sx={{ color: "error.main" }}>
                ({timeAgo(result.created_at)})
              </Box>
            </Typography>

            <Typography variant="body2">
              อัปเดตล่าสุด: {formatDateTHBE(result.updated_at)}
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
}
