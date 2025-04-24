export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `Access denied: ${
          req.user?.role || "unknown"
        } role is not allowed. Allowed roles: ${allowedRoles.join(", ")}`
      );
    }
    next();
  };
};
