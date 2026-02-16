import type { Page } from "../constants/menu";

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
