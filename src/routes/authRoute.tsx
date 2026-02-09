import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function AuthRoute() {
  const { isAuthenticated, loading } = useAppSelector((s) => s.auth);

  if (loading) return null;

  // ❌ ยังไม่ login
  if (!isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }

  // ✅ ผ่าน
}
