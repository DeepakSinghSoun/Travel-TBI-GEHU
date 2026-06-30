export const adminOnly = (req, res, next) => {
  try {
    // req.user must already be set by protect middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // check role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in admin check",
    });
  }
};