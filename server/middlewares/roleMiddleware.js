// import ErrorHandler from "../utils/ErrorHandler"; // Assuming you have this ErrorHandler class
import { Constants } from "../constants/constants.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Debugging: check roles and user details
      console.log("Allowed roles:", allowedRoles); // what roles are allowed
      console.log("Admin role in Constants:", Constants.USER.ADMIN); // Assuming Constants.USER.ADMIN is defined
      console.log("Current user role:", req.user?.role);

      // Check if the user has a valid role and if it's included in allowed roles
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        // Log to server console for debugging purposes
        console.error(
          `Access denied: ${req.user?.role || "unknown"} role is not allowed.`
        );

        // Send error response
        return next(
          new ErrorHandler(
            `Access denied: ${
              req.user?.role || "unknown"
            } role is not allowed. Allowed roles: ${allowedRoles.join(", ")}`,
            403
          )
        );
      }

      next(); // Role is authorized, proceed to the next middleware
    } catch (error) {
      // Catch any unexpected errors and pass them to the global error handler
      return next(
        new ErrorHandler("An error occurred while checking roles.", 500)
      );
    }
  };
};
