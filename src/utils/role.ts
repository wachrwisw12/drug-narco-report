import type { Page } from "../constants/menu";

export function filterPagesByRole(pages: Page[], userRole?: number) {
  return pages.filter((p) => {
    console.log(userRole);
    // if (!p.roles) return true;

    return userRole === p.roles;
  });
}
