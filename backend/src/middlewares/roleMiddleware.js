

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Authentication middleware must run first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // User role missing
    if (!req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Role not assigned to this user.",
      });
    }

    // Check permission
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You don't have permission to perform this action.",
      });
    }

    next();
  };
};