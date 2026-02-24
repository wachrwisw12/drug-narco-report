import type { StatusType } from "../constants/status.config";

export type ReportPayload = {
  village: string;
  sub_districts_id?: number;
  detail: string;
  // name?: string;
  // phone?: string;

  images?: File[];
};
export type CaseFilse = {
  id: number;
  object_key: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
  stream_url: string;
};
export interface CaseReport {
  id: number;
  tracking_code: string;
  file_count: number;
  title: string;
  status: StatusType;
  images: string[];
  files: CaseFilse[];
  details: string;
  assigned_role_id: number | null;
  village: string;
  full_area: string;
  sub_district_id: number;
  reporter_name: string;
  reporter_phone: string;
  location: string;
  name_status: string;
  evidence_url?: string;
  created_at: string;
  updated_at: string;
}
export type StatusRequest = {
  id: number;
  action: number;
  reason: string;
};
