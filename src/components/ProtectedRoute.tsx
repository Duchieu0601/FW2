// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { JSX } from "react";

type Props = {
  children: JSX.Element;
  role?: string;
};

const ProtectedRoute = ({ children, role }: Props) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
