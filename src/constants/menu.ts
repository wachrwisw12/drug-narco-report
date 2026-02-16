/* ===== ROLE ===== */
export const ROLE = {
  SUPER_ADMIN: 5,
  DISTRICT_ADMIN: 2,
  EXECUTIVE: 1,
} as const;

/* ===== PAGE TYPE ===== */
export type Page = {
  label: string;
  path: string;
  roles?: number[];
};

/* ===== MENU CONFIG ===== */
export const pages: Page[] = [
  { label: "แดชบอร์ด", path: "dashboard", roles: [1, 2, 5] },
  {
    label: "แจ้งเบาะแส",
    path: "report",
  },
  {
    label: "ติดตามเรื่องที่แจ้ง",
    path: "track",
  },
  {
    label: "จัดการระดับอำเภอ",
    path: "district",
    roles: [ROLE.DISTRICT_ADMIN],
  },
  {
    label: "รายการแจ้งเบาะแสทั้งหมด",
    path: "reportsList",
    roles: [ROLE.SUPER_ADMIN],
  },
];
