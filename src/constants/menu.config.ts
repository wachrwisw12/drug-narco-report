import Visibility from "@mui/icons-material/Visibility";
import {
  Campaign,
  Dashboard,
  Wysiwyg,
  type SvgIconComponent,
} from "@mui/icons-material";

/* ===== ROLE ===== */
export const ROLE = {
  SUPER_ADMIN: 5,
  DISTRICT_ADMIN: 4,
  EXECUTIVE: 6,
  GUEST: 1,
} as const;

/* ===== PAGE TYPE ===== */
export type Page = {
  label: string;
  path: string;
  roles?: number[];
  icon?: SvgIconComponent;
};

/* ===== MENU CONFIG ===== */
export const pages: Page[] = [
  {
    label: "แดชบอร์ด",
    path: "dashboard",
    roles: [ROLE.SUPER_ADMIN, ROLE.DISTRICT_ADMIN, ROLE.EXECUTIVE],
    icon: Dashboard,
  },
  {
    label: "แจ้งเบาะแส",
    path: "report",
    roles: [ROLE.GUEST],
    icon: Visibility,
  },
  {
    label: "ติดตามเรื่องที่แจ้ง",
    path: "track",
    roles: [ROLE.GUEST],
    icon: Campaign,
  },
  {
    label: "เคสทั้งหมด",
    path: "reportsList",
    roles: [ROLE.SUPER_ADMIN, ROLE.DISTRICT_ADMIN],
    icon: Wysiwyg,
  },
];
