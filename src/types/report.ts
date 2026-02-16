export type ReportPayload = {
  village: string;
  sub_districts_id?: number;
  detail: string;
  // name?: string;
  // phone?: string;

  images?: File[];
};

export interface CaseReport {
  id: number;
  tracking_code: string;
  title: string;
  status: number;
  details: string;
  village: string;
  full_area: string;
  sub_district_id: number;
  reporter_name: string;
  reporter_phone: string;
  location: string;
  name_status: string;
  evidence_url?: string;
  created_at: string;
}
export type StatusRequest = {
  id: number;
  action: number;
  reason: string;
};
