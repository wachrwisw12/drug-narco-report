import { useState } from "react";
import ReportForm from "../components/ReportFrom";
import { createReport } from "../services/report.service";
import type { ReportPayload } from "../types/report";
import { toast } from "react-toastify";
import AppDialog from "../components/AppDialog";

export default function ReportPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [successOpen, setSuccessOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string>("");

  const handleSubmit = async (data: ReportPayload) => {
    if (loading) return;

    setLoading(true);
    setProgress(0);

    try {
      const result = await createReport(data, setProgress);
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
        onSubmit={handleSubmit}
        loading={loading}
        progress={progress}
      />

      <AppDialog
        open={successOpen}
        title="รหัสติดตามเรื่อง"
        message={trackingCode}
        maxWidth="sm"
        fullWidth
        onClose={() => setSuccessOpen(false)}
      />
    </>
  );
}
