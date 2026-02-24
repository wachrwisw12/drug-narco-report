import { ROLE } from "./menu.config";

export const STATUS = {
  NEW: 1,
  FORWARDED_TO_AREA: 2,
  WAITING_RECEIVE: 3,
  PROCESSING: 4,
  CLOSED: 5,
  REJECTED: 6,
} as const;

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
/* ===== REPORT TABS ===== */
type TabConfig = {
  label: string;
  value: StatusType | "all";
  roles: number[];
};

export const reportTabs: TabConfig[] = [
  {
    label: "ทั้งหมด",
    value: "all",
    roles: [ROLE.DISTRICT_ADMIN, ROLE.SUPER_ADMIN],
  },
  {
    label: "New",
    value: STATUS.NEW,
    roles: [ROLE.SUPER_ADMIN],
  },
  {
    label: "รอพื้นที่รับเรื่อง",
    value: STATUS.FORWARDED_TO_AREA,
    roles: [ROLE.DISTRICT_ADMIN],
  },

  {
    label: "ดำเนินการ",
    value: STATUS.PROCESSING,
    roles: [ROLE.SUPER_ADMIN, ROLE.DISTRICT_ADMIN],
  },
  {
    label: "ปิดแล้ว",
    value: STATUS.CLOSED,
    roles: [ROLE.SUPER_ADMIN, ROLE.DISTRICT_ADMIN],
  },
];
