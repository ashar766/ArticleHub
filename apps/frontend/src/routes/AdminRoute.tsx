import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "@articlehub/shared";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AdminRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== Role.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
