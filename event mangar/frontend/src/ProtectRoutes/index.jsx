import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";

const ProtectRoutes = ({ children, role }) => {
  const { user, isLoading } = UserAuth();

  // 👇 Important: Don't render anything while loading
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  // 👇 If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 👇 If user has wrong role
  if (role && !role.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRoutes;
