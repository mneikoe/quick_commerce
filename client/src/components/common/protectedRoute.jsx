import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { currentUser, loading, error } = useSelector(
    (state) => state.auth || {}
  );

  if (loading) return <Loader />;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
