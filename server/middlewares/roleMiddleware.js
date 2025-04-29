import { ErrorHandler } from "../utils/errorHandler.js";

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
    
        console.error(
          `Access denied: ${
            req.user?.role || "unknown"
          } role is not allowed.Allowed roles: ${allowedRoles}`
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
      console.log("An error occurred while checking roles.", error);
      return next(
        new ErrorHandler("An error occurred while checking roles.", 500)
      );
    }
  };
};
