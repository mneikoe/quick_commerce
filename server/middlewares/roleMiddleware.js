// import ErrorHandler from "../utils/ErrorHandler"; // Assuming you have this ErrorHandler class
import { Constants } from "../constants/constants.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Debugging: check roles and user details
      console.log("Allowed roles:", allowedRoles); //admin
      console.log("Admin role in Constants:", Constants.USER.ADMIN); //admin
      console.log("Current user role:", req.user?.role); //admin

      if (!req.user || !allowedRoles.includes(req.user.role)) {
        console.error(
          `Access denied: ${req.user?.role || "unknown"} role is not allowed.`
        );

        return next(
          new ErrorHandler(
            `Access denied: ${
              req.user?.role || "unknown"
            } role is not allowed. Allowed roles: ${allowedRoles}`,
            403
          )
        );
      }

      next();
    } catch (error) {

      return next(
        new ErrorHandler("An error occurred while checking roles.", 500)
      );
    }
  };
};
