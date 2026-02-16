import api from "../api/axios";
import type { ReportPayload, StatusRequest } from "../types/report";
export async function updateStatusReport(
  data: StatusRequest,
): Promise<{ success: boolean; message: string }> {
  const res = await api.post("/v1/update-status", data);

  return {
    success: res.data.success,
    message: res.data.message,
  };
}
export async function createReport(
  data: ReportPayload,
  onProgress?: (p: number) => void,
) {
  const formData = new FormData();

  // text fields
  formData.append("details", data.detail);

  if (data.sub_districts_id) {
    formData.append("sub_district_id", String(data.sub_districts_id));
  }

  if (data.village) {
    formData.append("village", data.village);
  }

  // images
  data.images?.forEach((img) => {
    formData.append("images", img);
  });

  const res = await api.post("/v1/sendreport", formData, {
    onUploadProgress: (e) => {
      if (e.total && onProgress) {
        onProgress(Math.round((e.loaded * 100) / e.total));
      }
    },
  });

  return {
    tracking_code: res.data.data.tracking_code,
    success: res.data.success,
  };
}
