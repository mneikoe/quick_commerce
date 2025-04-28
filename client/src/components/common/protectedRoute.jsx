import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";
import ErrorPage from "../../pages/ErrorPage";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { currentUser, loading, error } = useSelector(
    (state) => state.auth || {}
  );

  // console.log("current user role", currentUser?.role);
  // console.log("Allowed Roles:", allowedRoles);
  // console.log(typeof currentUser?.role); // should be 'string'
  // console.log(allowedRoles.map((role) => typeof role)); // should all be 'string'

  // console.log(error);

  // // If there's an error, render the ErrorPage component with the error
  // if (error) {
  //   return <ErrorPage error={error} />;
  // }

  // Show loading indicator while fetching user data
  if (loading) return <Loader />;

  // If no user is logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not allowed, redirect to unauthorized page
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
