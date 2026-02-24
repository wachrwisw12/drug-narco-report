import { ROLE, type Page } from "../constants/menu.config";
import { STATUS, type StatusType } from "../constants/status.config";

export function filterPagesByRole(pages: Page[], userRole?: number) {
  return pages.filter((p) => {
    // ถ้า page ไม่กำหนด roles → เข้าได้ทุกคน
    if (!p.roles) return true;

    // ถ้า user ไม่มี role → ไม่ให้เข้า

    if (userRole === undefined) return false;

    // เช็คว่า role user อยู่ใน roles page ไหม
    return p.roles.includes(userRole);
  });
}

export function getAllowedActions(
  roleId: number | undefined,
  currentStatus: StatusType,
) {
  if (!roleId) return [];

  const rule = reportPermissions.find(
    (r) => r.role === roleId && r.from === currentStatus,
  );

  return rule?.actions ?? [];
}
type PermissionRule = {
  role: number;
  from: StatusType;
  actions: StatusType[];
};

export const reportPermissions: PermissionRule[] = [
  // 👑 SUPER ADMIN
  {
    role: ROLE.SUPER_ADMIN,
    from: STATUS.NEW,
    actions: [STATUS.FORWARDED_TO_AREA], // รับเรื่อง/ส่งพื้นที่
  },

  // 🏢 DISTRICT ADMIN
  {
    role: ROLE.DISTRICT_ADMIN,
    from: STATUS.FORWARDED_TO_AREA,
    actions: [STATUS.PROCESSING], // รับเรื่อง
  },
  {
    role: ROLE.DISTRICT_ADMIN,
    from: STATUS.PROCESSING,
    actions: [STATUS.CLOSED], // ปิดเคส
  },
];
