import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
type ProtectedRouteProps = {
  allowRoles?: number[];
};
export default function ProtectedRoute({ allowRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAppSelector((s) => s.auth);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowRoles && user && !allowRoles.includes(user.role_id)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
