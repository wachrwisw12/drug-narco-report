import type { StatusType } from "./status.config";

export const statusColor: Record<
  StatusType,
  "default" | "warning" | "info" | "success"
> = {
  1: "warning", // รอรับเรื่อง
  2: "info", // กำลังดำเนินการ
  3: "success", // เสร็จสิ้น
  4: "default", // ยกเลิก
  5: "default", // ปิดแล้ว
  6: "default", // ปฏิเสธ
};
