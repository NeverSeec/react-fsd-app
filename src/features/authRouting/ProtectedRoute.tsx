import { type ReactNode } from "react";
import { useAuth } from "./AuthContext.tsx";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return props.children ? <>{props.children}</> : <Outlet />;
}
