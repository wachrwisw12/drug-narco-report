import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import PageLoader from "../components/PageLoader";

type Props = {
  allowRoles?: number[];
};

export default function ProtectedRoute({ allowRoles }: Props) {
  const { isAuthenticated, user, loading } = useAppSelector((s) => s.auth);

  if (loading) return <PageLoader open />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowRoles && user && !allowRoles.includes(user.role_id)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
