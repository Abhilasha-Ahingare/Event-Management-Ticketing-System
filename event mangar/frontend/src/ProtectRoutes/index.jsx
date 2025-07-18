import React from "react";
import { UserAuth } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ role, children }) => {
  const { user } = UserAuth();

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) {
        return <Navigate to="/login" replace />;
      }
    } else {
      if (user.role !== role) {
        return <Navigate to="/login" replace />;
      }
    }
  }

  return children;
};

export default ProtectRoutes;
