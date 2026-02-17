import { useEffect, useState } from "react";
import ReportForm from "../components/ReportFrom";
import { createReport } from "../services/report.service";
import type { ReportPayload } from "../types/report";
import { toast } from "react-toastify";
import AppDialog from "../components/AppDialog";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
export default function ReportPage() {
  const [formKey, setFormKey] = useState(0);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [successOpen, setSuccessOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string>("");
  useEffect(() => {
    console.log("loading changed:", loading);
  }, [loading]);
  const handleSubmit = async (data: ReportPayload) => {
    if (loading) return;
    setLoading(true);

    setProgress(0);

    try {
      const result = await createReport(data, setProgress);
      console.log(result);
      setFormKey((k) => k + 1);
      setTrackingCode(result.tracking_code);
      setSuccessOpen(true);
    } catch {
      toast.error("ส่งข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ReportForm
        key={formKey}
        onSubmit={handleSubmit}
        loading={loading}
        progress={progress}
      />

      <AppDialog
        open={successOpen}
        title="ส่งข้อมูลสำเร็จ"
        message={
          <Stack spacing={2} alignItems="center">
            {/* success icon */}
            <CheckCircleIcon sx={{ fontSize: 60, color: "success.main" }} />

            <Typography textAlign="center">
              ถ้าท่านต้องการติดตามสถานะเรื่องที่ท่านแจ้ง
              กรุณาเก็บรหัสนี้ไว้เพื่อติดตาม ในเมนู ติดตามเรื่องที่แจ้ง
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>รหัส</Typography>

              <Typography fontWeight={600} color="error">
                {trackingCode}
              </Typography>

              <Tooltip title="คัดลอก">
                <IconButton
                  size="small"
                  onClick={() => navigator.clipboard.writeText(trackingCode)}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        }
        maxWidth="sm"
        fullWidth
        onClose={() => setSuccessOpen(false)}
      />
    </>
  );
}
