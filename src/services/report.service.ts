import api from "../api/axios";
import type { ReportPayload } from "../types/report";

// report.service.ts
export async function createReport(
  data: ReportPayload,
  onProgress?: (p: number) => void,
) {
  const formData = new FormData();
  formData.append("details", data.detail);

  data.images?.forEach((img: string | Blob) => {
    formData.append("images", img);
  });

  const res = await api.post("/api/v1/sendreport", formData, {
    onUploadProgress: (e) => {
      if (e.total && onProgress) {
        onProgress(Math.round((e.loaded * 100) / e.total));
      }
    },
  });
  console.log(res.data);
  return { tracking_code: res.data.data.tracking_code };
}
